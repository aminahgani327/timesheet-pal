import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, '../data.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS timesheet_rows (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    week_start TEXT NOT NULL,
    charge_code TEXT NOT NULL,
    work_location TEXT,
    mon REAL DEFAULT 0,
    tue REAL DEFAULT 0,
    wed REAL DEFAULT 0,
    thu REAL DEFAULT 0,
    fri REAL DEFAULT 0,
    submitted INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

// Repository pattern: all data access goes through these functions,
// so swapping SQLite for Postgres later (per ADR-001) only touches this file.
export const rowsRepo = {
  getWeek: (userId, weekStart) =>
    db.prepare(
      'SELECT * FROM timesheet_rows WHERE user_id = ? AND week_start = ?'
    ).all(userId, weekStart),

  upsertRow: (row) => {
    const stmt = db.prepare(`
      INSERT INTO timesheet_rows
        (user_id, week_start, charge_code, work_location, mon, tue, wed, thu, fri)
      VALUES (@user_id, @week_start, @charge_code, @work_location, @mon, @tue, @wed, @thu, @fri)
    `);
    return stmt.run(row);
  },

  markSubmitted: (userId, weekStart) =>
    db.prepare(
      'UPDATE timesheet_rows SET submitted = 1 WHERE user_id = ? AND week_start = ?'
    ).run(userId, weekStart),

  getPreviousWeek: (userId, currentWeekStart) =>
    db.prepare(`
      SELECT * FROM timesheet_rows
      WHERE user_id = ? AND week_start < ?
      ORDER BY week_start DESC
      LIMIT 20
    `).all(userId, currentWeekStart),
};

export default db;

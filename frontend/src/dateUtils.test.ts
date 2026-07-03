import { describe, test, expect } from 'vitest';
import { toWeekStartMonday, formatISODate, weekDates } from './dateUtils';

describe('toWeekStartMonday', () => {
  test('a Wednesday normalises back to the Monday of that week', () => {
    const wednesday = new Date('2026-07-08'); // Wednesday
    const result = toWeekStartMonday(wednesday);
    expect(formatISODate(result)).toBe('2026-07-06'); // Monday
  });

  test('a Sunday normalises to the previous Monday, not the same week', () => {
    const sunday = new Date('2026-07-12'); // Sunday
    const result = toWeekStartMonday(sunday);
    expect(formatISODate(result)).toBe('2026-07-06');
  });

  test('a Monday stays the same date', () => {
    const monday = new Date('2026-07-06');
    const result = toWeekStartMonday(monday);
    expect(formatISODate(result)).toBe('2026-07-06');
  });
});

describe('weekDates', () => {
  test('returns five consecutive dates starting from Monday', () => {
    const monday = new Date('2026-07-06');
    const dates = weekDates(monday).map(formatISODate);
    expect(dates).toEqual([
      '2026-07-06',
      '2026-07-07',
      '2026-07-08',
      '2026-07-09',
      '2026-07-10',
    ]);
  });
});

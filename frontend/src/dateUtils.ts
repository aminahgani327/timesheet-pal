/**
 * Normalises any date to the Monday of that week, avoiding ambiguity
 * about week boundaries when a mid-week date is selected.
 * Carried over from the original prototype's data modelling approach.
 */
export function toWeekStartMonday(date: Date): Date {
  const result = new Date(date);
  const day = result.getDay(); // 0 = Sunday, 1 = Monday, ...
  const diff = day === 0 ? -6 : 1 - day; // shift Sunday back to previous Monday
  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function formatISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function weekDates(weekStart: Date): Date[] {
  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });
}

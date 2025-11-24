import { formatDateTime } from './formatters';

describe('formatDateTime', () => {
  it('formats ISO date correctly', () => {
    const input = '2025-03-15T09:05:00.000Z';
    const result = formatDateTime(input);

    // CET timezone in test environment
    expect(result).toBe("15.3.2025 10:05");
  });

  it('returns empty string for invalid value', () => {
    expect(formatDateTime('not-a-date')).toBe('');
  });
});

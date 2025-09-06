import { formatDate, formatDateSimple } from '../formatDate';

describe('Date Formatting Utils', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2023-06-15T10:30:00Z');

      const result = formatDate(date.toISOString());

      expect(result).toBe('Jun 15, 2023');
    });

    it('should format different months correctly', () => {
      const date = new Date('2023-12-25T00:00:00Z');

      const result = formatDate(date.toISOString());

      expect(result).toBe('Dec 25, 2023');
    });

    it('should handle invalid date strings', () => {
      const result = formatDate('invalid-date');

      expect(result).toBe('Invalid Date');
    });

    it('should handle empty string', () => {
      const result = formatDate('');

      expect(result).toBe('Invalid Date');
    });

    it('should handle null or undefined', () => {
      expect(formatDate(null as any)).toBe('Jan 1, 1970');
      expect(formatDate(undefined as any)).toBe('Invalid Date');
    });
  });

  describe('formatDateSimple', () => {
    it('should format date in simple format', () => {
      const date = new Date('2023-06-15T10:30:00Z');

      const result = formatDateSimple(date.toISOString());

      expect(result).toBe('6/15/2023');
    });

    it('should handle different months', () => {
      const date = new Date('2023-12-25T00:00:00Z');

      const result = formatDateSimple(date.toISOString());

      expect(result).toBe('12/25/2023');
    });

    it('should handle invalid date strings', () => {
      const result = formatDateSimple('invalid-date');

      expect(result).toBe('Invalid Date');
    });

    it('should handle null or undefined', () => {
      expect(formatDateSimple(null as any)).toBe('1/1/1970');
      expect(formatDateSimple(undefined as any)).toBe('Invalid Date');
    });
  });
});

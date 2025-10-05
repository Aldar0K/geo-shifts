import { formatDate, formatTime } from "../date";

describe("date utils", () => {
  describe("formatDate", () => {
    it("should format date to Russian locale", () => {
      const result = formatDate("2025-01-15T10:00:00");
      expect(result).toBe("15 января");
    });

    it("should format date with different month", () => {
      const result = formatDate("2025-06-20T10:00:00");
      expect(result).toBe("20 июня");
    });

    it("should handle date at the start of month", () => {
      const result = formatDate("2025-03-01T10:00:00");
      expect(result).toBe("01 марта");
    });

    it("should handle date at the end of month", () => {
      const result = formatDate("2025-12-31T10:00:00");
      expect(result).toBe("31 декабря");
    });
  });

  describe("formatTime", () => {
    it("should extract HH:MM from time string", () => {
      const result = formatTime("14:30:00");
      expect(result).toBe("14:30");
    });

    it("should handle morning time", () => {
      const result = formatTime("09:15:00");
      expect(result).toBe("09:15");
    });

    it("should handle midnight", () => {
      const result = formatTime("00:00:00");
      expect(result).toBe("00:00");
    });

    it("should handle time before noon", () => {
      const result = formatTime("11:59:59");
      expect(result).toBe("11:59");
    });
  });
});

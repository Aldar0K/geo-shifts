import { formatPrice } from "../number";

describe("number utils", () => {
  describe("formatPrice", () => {
    it("should format price with ruble symbol", () => {
      const result = formatPrice(1000);
      expect(result).toBe("1\u00A0000 ₽");
    });

    it("should format large numbers with spaces", () => {
      const result = formatPrice(1500000);
      expect(result).toBe("1\u00A0500\u00A0000 ₽");
    });

    it("should handle small numbers", () => {
      const result = formatPrice(500);
      expect(result).toBe("500 ₽");
    });

    it("should handle zero", () => {
      const result = formatPrice(0);
      expect(result).toBe("0 ₽");
    });

    it("should format numbers with decimal precision", () => {
      const result = formatPrice(1234567);
      expect(result).toBe("1\u00A0234\u00A0567 ₽");
    });
  });
});

import { convertSecondsToHMS } from "../../helpers/sessionHelpers";

describe("convertSecondsToHMS", () => {
    it("should convert seconds to hours, minutes, and seconds correctly", () => {
      expect(convertSecondsToHMS(3600)).toBe("1h 0m 0s");
      expect(convertSecondsToHMS(600)).toBe("0h 10m 0s");
      expect(convertSecondsToHMS(125)).toBe("0h 2m 5s");
    });

    it("should return 0h 0m 0s for 0 seconds", () => {
      expect(convertSecondsToHMS(0)).toBe("0h 0m 0s");
    });

    it("should handle seconds less than 60", () => {
      expect(convertSecondsToHMS(45)).toBe("0h 0m 45s");
    });

    it("should handle larger times correctly", () => {
      expect(convertSecondsToHMS(3661)).toBe("1h 1m 1s");
    });

    it("should round correctly for fractional seconds", () => {
      expect(convertSecondsToHMS(125.9)).toBe("0h 2m 6s");
    });

    it("should handle negative times (if applicable)", () => {
      expect(() => convertSecondsToHMS(-120)).toThrow("Invalid input");
    });
  });


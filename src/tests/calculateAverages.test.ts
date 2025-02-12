import { calculateAverages } from "../helpers/sessionHelpers";
import { SessionDataMap } from "../types";

describe("calculateAverages", () => {
  it("should calculate averages correctly", () => {
    const sessionData: SessionDataMap = {
      "session1": { totalDuration: 3600, sessionCount: 1, totalReps: 100, totalRpeScore: 6, rpeCount: 1 },
      "session2": { totalDuration: 4200, sessionCount: 1, totalReps: 120, totalRpeScore: 7, rpeCount: 1 },
    };

    const result = calculateAverages(sessionData);

    expect(result.averageDuration).toBe(3900);
    expect(result.averageReps).toBe(110);
    expect(result.averageRpe).toBe(6.5);
  });

  it("should handle empty session data", () => {
    const sessionData: SessionDataMap = {};

    const result = calculateAverages(sessionData);

    expect(result.averageDuration).toBe(0);
    expect(result.averageReps).toBe(0);
    expect(result.averageRpe).toBe(0);
  });

  it("should handle sessions with no RPE data", () => {
    const sessionData: SessionDataMap = {
      "session1": { totalDuration: 3600, sessionCount: 1, totalReps: 100, totalRpeScore: 0, rpeCount: 0 },
      "session2": { totalDuration: 4200, sessionCount: 1, totalReps: 120, totalRpeScore: 0, rpeCount: 0 },
    };

    const result = calculateAverages(sessionData);

    expect(result.averageRpe).toBe(0);
  });

  it("should return zero averages for one session", () => {
    const sessionData: SessionDataMap = {
      "session1": { totalDuration: 3600, sessionCount: 1, totalReps: 100, totalRpeScore: 6, rpeCount: 1 },
    };

    const result = calculateAverages(sessionData);

    expect(result.averageDuration).toBe(3600);
    expect(result.averageReps).toBe(100);
    expect(result.averageRpe).toBe(6);
  });
});

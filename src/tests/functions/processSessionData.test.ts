import { processSessionData } from "../../helpers/sessionHelpers";
import { SessionDataMap } from "../../types";

describe("processSessionData", () => {
  it("should correctly accumulate session data for valid input", () => {
    const logs = [
      { sessionId: "1", durationInSeconds: 120, completedRepCount: 20, rpeScore: 6 },
      { sessionId: "1", durationInSeconds: 100, completedRepCount: 25, rpeScore: 7 },
    ];

    const result: SessionDataMap = processSessionData(logs);

    expect(result["1"]).toEqual({
      totalDuration: 220,
      sessionCount: 2,
      totalReps: 45,
      totalRpeScore: 13,
      rpeCount: 2,
    });
  });

  it("should return an empty object for an empty input array", () => {
    const logs: { sessionId: string; durationInSeconds: number; completedRepCount: number; rpeScore: number }[] = [];
    const result = processSessionData(logs);
    expect(result).toEqual({});
  });

  it("should handle a single session correctly", () => {
    const logs = [
      { sessionId: "1", durationInSeconds: 120, completedRepCount: 20, rpeScore: 6 },
    ];

    const result: SessionDataMap = processSessionData(logs);

    expect(result["1"]).toEqual({
      totalDuration: 120,
      sessionCount: 1,
      totalReps: 20,
      totalRpeScore: 6,
      rpeCount: 1,
    });
  });

  it("should handle multiple sessions correctly", () => {
    const logs = [
      { sessionId: "1", durationInSeconds: 120, completedRepCount: 20, rpeScore: 6 },
      { sessionId: "2", durationInSeconds: 100, completedRepCount: 25, rpeScore: 7 },
    ];

    const result: SessionDataMap = processSessionData(logs);

    expect(result["1"]).toEqual({
      totalDuration: 120,
      sessionCount: 1,
      totalReps: 20,
      totalRpeScore: 6,
      rpeCount: 1,
    });
    expect(result["2"]).toEqual({
      totalDuration: 100,
      sessionCount: 1,
      totalReps: 25,
      totalRpeScore: 7,
      rpeCount: 1,
    });
  });

  it("should correctly accumulate data for duplicate sessions", () => {
    const logs = [
      { sessionId: "1", durationInSeconds: 120, completedRepCount: 20, rpeScore: 6 },
      { sessionId: "1", durationInSeconds: 100, completedRepCount: 25, rpeScore: 7 },
    ];

    const result: SessionDataMap = processSessionData(logs);

    expect(result["1"]).toEqual({
      totalDuration: 220,
      sessionCount: 2,
      totalReps: 45,
      totalRpeScore: 13,
      rpeCount: 2,
    });
  });

  it("should handle zero values correctly", () => {
    const logs = [
      { sessionId: "1", durationInSeconds: 0, completedRepCount: 0, rpeScore: 0 },
    ];

    const result: SessionDataMap = processSessionData(logs);

    expect(result["1"]).toEqual({
      totalDuration: 0,
      sessionCount: 1,
      totalReps: 0,
      totalRpeScore: 0,
      rpeCount: 1,
    });
  });

  it("should handle negative values gracefully", () => {
    const logs = [
      { sessionId: "1", durationInSeconds: -120, completedRepCount: -20, rpeScore: -6 },
    ];

    const result: SessionDataMap = processSessionData(logs);

    expect(result["1"]).toEqual({
      totalDuration: -120,
      sessionCount: 1,
      totalReps: -20,
      totalRpeScore: -6,
      rpeCount: 1,
    });
  });
});

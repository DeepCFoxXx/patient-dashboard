import { processSessionData } from "../helpers/sessionHelpers";
import { SessionDataMap } from "../types";

describe("processSessionData", () => {
  it("should correctly aggregate session data", () => {
    const logs = [
      { sessionId: "session1", durationInSeconds: 120, completedRepCount: 10, rpeScore: 6 },
      { sessionId: "session1", durationInSeconds: 150, completedRepCount: 15, rpeScore: 7 },
      { sessionId: "session2", durationInSeconds: 90, completedRepCount: 5, rpeScore: 5 },
    ];

    const expectedResult: SessionDataMap = {
      session1: {
        totalDuration: 270,
        sessionCount: 2,
        totalReps: 25,
        totalRpeScore: 13,
        rpeCount: 2,
      },
      session2: {
        totalDuration: 90,
        sessionCount: 1,
        totalReps: 5,
        totalRpeScore: 5,
        rpeCount: 1,
      },
    };

    const result = processSessionData(logs);
    expect(result).toEqual(expectedResult);
  });
});

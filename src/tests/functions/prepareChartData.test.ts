import { prepareChartData } from "../../helpers/sessionHelpers";

describe("prepareChartData", () => {
  it("should prepare chart data correctly", () => {
    const logs = [
      { timestamp: "2025-02-10T12:00:00", completedRepCount: 10 },
      { timestamp: "2025-02-10T13:00:00", completedRepCount: 5 },
      { timestamp: "2025-02-11T12:00:00", completedRepCount: 20 },
    ];

    const result = prepareChartData(logs);

    expect(result).toEqual([
      { date: "2025-02-10", totalReps: 15 },
      { date: "2025-02-11", totalReps: 20 },
    ]);
  });

  it("should return an empty array for no logs", () => {
    const logs: { timestamp: string; completedRepCount: number }[] = [];
    const result = prepareChartData(logs);

    expect(result).toEqual([]);
  });

  it("should handle logs with the same date correctly", () => {
    const logs = [
      { timestamp: "2025-02-10T12:00:00", completedRepCount: 5 },
      { timestamp: "2025-02-10T14:00:00", completedRepCount: 10 },
    ];

    const result = prepareChartData(logs);

    expect(result).toEqual([
      { date: "2025-02-10", totalReps: 15 },
    ]);
  });

  it("should handle logs with different dates correctly", () => {
    const logs = [
      { timestamp: "2025-02-10T12:00:00", completedRepCount: 10 },
      { timestamp: "2025-02-11T12:00:00", completedRepCount: 5 },
    ];

    const result = prepareChartData(logs);

    expect(result).toEqual([
      { date: "2025-02-10", totalReps: 10 },
      { date: "2025-02-11", totalReps: 5 },
    ]);
  });
});

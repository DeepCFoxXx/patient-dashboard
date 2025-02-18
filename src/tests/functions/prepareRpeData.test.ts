import { prepareRpeData } from "../../helpers/sessionHelpers";

describe("prepareRpeData", () => {
  it("should prepare RPE data correctly", () => {
    const logs = [
      { timestamp: "2025-02-10T12:00:00", rpeScore: 6 },
      { timestamp: "2025-02-10T13:00:00", rpeScore: 7 },
      { timestamp: "2025-02-11T12:00:00", rpeScore: 5 },
    ];

    const result = prepareRpeData(logs);

    expect(result).toEqual([
      {
        id: "RPE",
        data: [
          { x: "2025-02-10", y: 7 },
          { x: "2025-02-11", y: 5 },
        ],
      },
    ]);
  });

  it("should return an empty array for no logs", () => {
    const logs: { timestamp: string; rpeScore: number }[] = [];
    const result = prepareRpeData(logs);

    expect(result).toEqual([
      {
        id: "RPE",
        data: [],
      },
    ]);
  });

  it("should handle logs with the same date correctly", () => {
    const logs = [
      { timestamp: "2025-02-10T12:00:00", rpeScore: 6 },
      { timestamp: "2025-02-10T14:00:00", rpeScore: 8 },
    ];

    const result = prepareRpeData(logs);

    expect(result).toEqual([
      {
        id: "RPE",
        data: [
          { x: "2025-02-10", y: 8 },
        ],
      },
    ]);
  });

  it("should handle logs with different dates correctly", () => {
    const logs = [
      { timestamp: "2025-02-10T12:00:00", rpeScore: 6 },
      { timestamp: "2025-02-11T12:00:00", rpeScore: 7 },
    ];

    const result = prepareRpeData(logs);

    expect(result).toEqual([
      {
        id: "RPE",
        data: [
          { x: "2025-02-10", y: 6 },
          { x: "2025-02-11", y: 7 },
        ],
      },
    ]);
  });
});

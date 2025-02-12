import { SessionDataMap } from "../types";


export const processSessionData = (
  logs: { sessionId: string; durationInSeconds: number; completedRepCount: number; rpeScore: number }[]
): SessionDataMap => {
  return logs.reduce((acc, { sessionId, durationInSeconds, completedRepCount, rpeScore }) => {
    if (!acc[sessionId]) {
      acc[sessionId] = { totalDuration: 0, sessionCount: 0, totalReps: 0, totalRpeScore: 0, rpeCount: 0 };
    }

    acc[sessionId].totalDuration += durationInSeconds;
    acc[sessionId].sessionCount += 1;
    acc[sessionId].totalReps += completedRepCount;
    acc[sessionId].totalRpeScore += rpeScore;
    acc[sessionId].rpeCount += 1;

    return acc;
  }, {} as SessionDataMap);
};

export const convertSecondsToHMS = (seconds: number): string => {
  if (seconds < 0) {
    throw new Error("Invalid input: negative time duration");
  }
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return `${hours}h ${minutes}m ${remainingSeconds}s`;
};


export const prepareChartData = (logs: { timestamp: string; completedRepCount: number }[]) => {
  const repsByDate = logs.reduce((acc, { timestamp, completedRepCount }) => {
    const date = timestamp.split("T")[0];

    if (acc.has(date)) {
      acc.set(date, acc.get(date)! + completedRepCount);
    } else {
      acc.set(date, completedRepCount);
    }

    return acc;
  }, new Map<string, number>());

  return Array.from(repsByDate, ([date, totalReps]) => ({ date, totalReps }));
};


export const prepareRpeData = (logs: { timestamp: string; rpeScore: number }[]) => {
  const rpeDataMap = new Map<string, number>();

  logs.forEach(({ timestamp, rpeScore }) => {
    const date = timestamp.split("T")[0];

    rpeDataMap.set(date, rpeScore);
  });

  const uniqueRpeData = Array.from(rpeDataMap, ([date, rpe]) => ({
    x: date,
    y: rpe,
  }));

  return [
    {
      id: "RPE",
      data: uniqueRpeData,
    },
  ];
};


export const calculateAverages = (sessionData: SessionDataMap) => {
  const { totalDuration, totalReps, totalRpeScore, totalRpeEntries } = Object.values(sessionData).reduce(
    (totals, { totalDuration, totalReps, totalRpeScore, rpeCount }) => {
      totals.totalDuration += totalDuration;
      totals.totalReps += totalReps;
      totals.totalRpeScore += totalRpeScore;
      totals.totalRpeEntries += rpeCount;
      return totals;
    },
    { totalDuration: 0, totalReps: 0, totalRpeScore: 0, totalRpeEntries: 0 }
  );

  const totalSessions = Object.keys(sessionData).length;

  const averageDuration = totalSessions > 0 ? totalDuration / totalSessions : 0;
  const averageReps = totalSessions > 0 ? totalReps / totalSessions : 0;
  const averageRpe = totalRpeEntries > 0 ? totalRpeScore / totalRpeEntries : 0;

  return { averageDuration, averageReps, averageRpe };
};



import { SessionDataMap } from "../types";


export const processSessionData = (
  logs: { sessionId: string; durationInSeconds: number; completedRepCount: number; rpeScore: number }[]
): SessionDataMap => {
  return logs.reduce((acc, log) => {
    const { sessionId, durationInSeconds, completedRepCount, rpeScore } = log;

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
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return `${hours}h ${minutes}m ${remainingSeconds}s`;
};

export const prepareChartData = (logs: { timestamp: string; completedRepCount: number }[]) => {
  return logs.reduce((acc, log) => {
    const date = log.timestamp.split("T")[0];
    const existingEntry = acc.find((entry) => entry.date === date);

    if (existingEntry) {
      existingEntry.totalReps += log.completedRepCount;
    } else {
      acc.push({ date, totalReps: log.completedRepCount });
    }

    return acc;
  }, [] as { date: string; totalReps: number }[]);
};

export const prepareRpeData = (logs: { timestamp: string; rpeScore: number }[]) => {
    const rpeData = logs.map((log) => ({
      date: log.timestamp.split("T")[0],
      rpe: log.rpeScore,
    }));

    const uniqueRpeData = Array.from(new Map(rpeData.map((item) => [item.date, item])).values()).map(item => ({
      x: item.date,
      y: item.rpe,
    }));

    return [
      {
        id: "RPE",
        data: uniqueRpeData,
      },
    ];
  };


export const calculateAverages = (sessionData: SessionDataMap) => {
  const totalSessions = Object.values(sessionData).reduce(
    (count, session) => count + session.sessionCount,
    0
  );
  const totalDuration = Object.values(sessionData).reduce(
    (sum, session) => sum + session.totalDuration,
    0
  );
  const totalReps = Object.values(sessionData).reduce(
    (sum, session) => sum + session.totalReps,
    0
  );
  const totalRpeScore = Object.values(sessionData).reduce(
    (sum, session) => sum + session.totalRpeScore,
    0
  );
  const totalRpeEntries = Object.values(sessionData).reduce(
    (count, session) => count + session.rpeCount,
    0
  );

  const averageDuration = totalSessions > 0 ? totalDuration / totalSessions : 0;
  const averageReps = totalSessions > 0 ? totalReps / totalSessions : 0;
  const averageRpe = totalRpeEntries > 0 ? totalRpeScore / totalRpeEntries : 0;

  return { averageDuration, averageReps, averageRpe };
};

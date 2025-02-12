export interface SessionData {
    totalDuration: number;
    sessionCount: number;
    totalReps: number;
    totalRpeScore: number;
    rpeCount: number;
  }

  export const processSessionData = (logs: { sessionId: string; durationInSeconds: number; completedRepCount: number; rpeScore: number }[]) => {
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
    }, {} as Record<string, SessionData>);
  };

  export const convertSecondsToHMS = (seconds: number) => {
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

    return Array.from(new Map(rpeData.map((item) => [item.date, item])).values()).map(item => ({
      x: item.date,
      y: item.rpe,
    }));
  };

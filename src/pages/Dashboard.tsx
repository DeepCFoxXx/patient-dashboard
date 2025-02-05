import React, { useEffect, useState } from "react";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import { activityLogs } from "../data/activityLogs";
import { patientData } from "../data/patientData";
import "../styles/styles.css";


interface ActivityLog {
  patientId: string;
  sessionId: string;
  activityLogId: string;
  activityType: string;
  timestamp: string;
  durationInSeconds: number;
  completedRepCount: number;
  rpeScore: number;
}

interface Patient {
  patientId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  dateCreated: string;
}

const Dashboard: React.FC = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setPatient(patientData);
      setLogs(activityLogs);
    } catch {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  // Could be moved out as helper functions (sperate file)
  const sessionData = logs.reduce((acc, log) => {
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
  }, {} as Record<string, { totalDuration: number; sessionCount: number; totalReps: number; totalRpeScore: number; rpeCount: number }>);

  const totalSessions = Object.values(sessionData).reduce((count, session) => count + session.sessionCount, 0);
  const totalDuration = Object.values(sessionData).reduce((sum, session) => sum + session.totalDuration, 0);
  const totalReps = Object.values(sessionData).reduce((sum, session) => sum + session.totalReps, 0);
  const totalRpeScore = Object.values(sessionData).reduce((sum, session) => sum + session.totalRpeScore, 0);
  const totalRpeEntries = Object.values(sessionData).reduce((count, session) => count + session.rpeCount, 0);

  const averageDuration = totalSessions > 0 ? totalDuration / totalSessions : 0;
  const averageReps = totalSessions > 0 ? totalReps / totalSessions : 0;
  const averageRpe = totalRpeEntries > 0 ? totalRpeScore / totalRpeEntries : 0;

  const convertSecondsToHMS = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  const formattedAverageDuration = convertSecondsToHMS(averageDuration);

  const chartData = logs.reduce((acc, log) => {
    const date = log.timestamp.split("T")[0];
    const existingEntry = acc.find((entry) => entry.date === date);

    if (existingEntry) {
      existingEntry.totalReps += log.completedRepCount;
    } else {
      acc.push({ date, totalReps: log.completedRepCount });
    }

    return acc;
  }, [] as { date: string; totalReps: number }[]);

  const rpeData = logs.map((log) => ({
    date: log.timestamp.split("T")[0],
    rpe: log.rpeScore,
  }));

  const uniqueRpeData = Array.from(
    new Map(rpeData.map((item) => [item.date, item])).values()
  );

  const rpeChartData = [
    {
      id: "RPE",
      data: uniqueRpeData.map((item) => ({
        x: item.date,
        y: item.rpe,
      })),
    },
  ];

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  const durationPieData = [
    { id: "Short (<15 min)", label: "Short (<15 min)", value: 10 },
    { id: "Medium (15-30 min)", label: "Medium (15-30 min)", value: 30 },
    { id: "Long (>30 min)", label: "Long (>30 min)", value: 20 },
  ];

  return (
    <div className="dashboard">
      <div className="card">
        <h2>Patient Details</h2>
        {patient && (
          <>
            <p>Name: {patient.firstName} {patient.lastName}</p>
            <p>Date of Birth: {patient.dateOfBirth}</p>
          </>
        )}
      </div>

      <div className="card">
        <h2>Average Reps Per Session</h2>
        <p>{Math.round(averageReps)} reps</p>
      </div>

      <div className="card chart-container">
        <h2>Reps Per Day</h2>
        <BarChart data={chartData} />
      </div>

      <div className="card">
        <h2>Average Therapy Duration</h2>
        <p>{formattedAverageDuration}</p>
      </div>

      <div className="card chart-container">
        <h2>Average Therapy Duration Long / Medium / Short</h2>
        <PieChart data={durationPieData} />
      </div>

      {/* Would like to add some dynamic colours here depending on output */}
      <div className="card">
        <h2>Average RPE Per Session</h2>
        <p>{averageRpe.toFixed(2)}</p>
      </div>

      <div className="card chart-container">
        <h2>RPE Over Time</h2>
        <LineChart data={rpeChartData} />
      </div>

    </div>
  );
};

export default Dashboard;

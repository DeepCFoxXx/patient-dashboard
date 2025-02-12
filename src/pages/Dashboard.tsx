import React, { useEffect, useState } from "react";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import { activityLogs } from "../data/activityLogs";
import { patientData } from "../data/patientData";
import { calculateAverages, convertSecondsToHMS, prepareChartData, prepareRpeData, processSessionData } from "../helpers/sessionHelpers";
import "../styles/styles.css";
import { ActivityLog, Patient, SessionDataMap } from "../types";

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

  const sessionData: SessionDataMap = processSessionData(logs);

  const { averageDuration, averageReps, averageRpe } = calculateAverages(sessionData);

  const formattedAverageDuration = convertSecondsToHMS(averageDuration);

  const chartData = prepareChartData(logs);
  const rpeChartData = prepareRpeData(logs);

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

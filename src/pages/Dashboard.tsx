import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import { activityLogs } from "../data/activityLogs";
import { patientData } from "../data/patientData";
import { calculateAverages, convertSecondsToHMS, prepareChartData, prepareRpeData, processSessionData } from "../helpers/sessionHelpers";
import "../styles/dashboard-styles.css";
import { ActivityLog, Patient, SessionDataMap } from "../types/globalTypes";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  const durationPieData = [
    { id: "Short", label: "Short", value: 10 },
    { id: "Medium", label: "Medium", value: 30 },
    { id: "Long", label: "Long", value: 20 },
  ];

  return (
    <div className="dashboard">
      <div className="card patient-details">
        <h2 className="underline">Patient Details</h2>
        {patient && (
          <div className="patient-info">
            <div className="patient-info-left">
              <p>Name: {patient.firstName} {patient.lastName}</p>
              <p>Date of Birth: {patient.dateOfBirth}</p>
              <p>Average Reps Per Session: {Math.round(averageReps)} reps</p>
              <p>Average Therapy Duration: {formattedAverageDuration}</p>
              <p>Average RPE Per Session: {averageRpe.toFixed(2)}</p>
            </div>
            <div className="patient-info-right">
              <h3>Average Therapy Duration</h3>
              <PieChart data={durationPieData} />
            </div>
          </div>
        )}
      </div>

      <div className="card chart-container">
        <h2>Reps Per Day</h2>
        <BarChart data={chartData} />
      </div>

      <div className="card chart-container">
        <h2>RPE Over Time</h2>
        <LineChart data={rpeChartData} />
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>

  );
};

export default Dashboard;

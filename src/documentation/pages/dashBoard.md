# Dashboard page

## Overview

The `Dashboard` component is a React functional component that provides an interactive dashboard for displaying patient therapy session data using various charts. It integrates bar, line, and pie charts using the `@nivo` library and processes activity logs to extract meaningful insights.

## Installation

Ensure you have the necessary dependencies installed before using this component:

```bash
npm install react-router-dom @nivo/bar @nivo/line @nivo/pie
```

## Dependencies

- **React Router (useNavigate)** - Handles navigation, including logout redirection.
- **State Management (useState, useEffect)** - Manages patient data, activity logs, loading states, and errors.
- **Helper Functions** - Processes session data, converts durations, and prepares chart data.
- **Charts** - Integrates bar, line, and pie charts to visualize therapy session data.

## Props

The Dashboard component does not accept any props directly.

## Usage

To use the Dashboard component, import and include it in a route within your React application:

```jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
```

## Features

- **Displays Patient Details:** Shows the patient’s name, date of birth, and average therapy statistics.
- **Visualizes Session Data:**
  - **Bar Chart (BarChart):** Displays total repetitions per day.
  - **Line Chart (LineChart):** Tracks Rate of Perceived Exertion (RPE) over time.
  - **Pie Chart (PieChart):** Represents therapy duration distribution.

- **Processes and Analyzes Data:**
  - Computes averages for session duration, repetitions, and RPE.
  - Formats time from seconds into hh:mm:ss.

- **Handles Errors & Loading States:** Displays appropriate messages if data fails to load.
- **Logout Functionality:** Removes the authentication token and redirects to the login page.

## Implementation Details

### Data Management

- **Patient Data:** Retrieved from `patientData` and stored in state.
- **Activity Logs:** Loaded from `activityLogs` and used to generate chart data.
- **Processed Session Data:** Uses `sessionHelpers` to calculate averages and format data for visualization.

### Helper Functions

The following functions are imported from `sessionHelpers`:

- **processSessionData(logs):** Organizes activity logs into a structured format.
- **calculateAverages(sessionData):** Computes average session statistics.
- **convertSecondsToHMS(seconds):** Converts a duration in seconds into hh:mm:ss format.
- **prepareChartData(logs):** Transforms logs into a format suitable for bar chart visualization.
- **prepareRpeData(logs):** Structures RPE data for the line chart.

### Charts

The component integrates the following charts:

- **Bar Chart (BarChart):** Displays daily repetitions.
- **Line Chart (LineChart):** Tracks RPE trends over time.
- **Pie Chart (PieChart):** Shows session duration distribution.

### Code Breakdown

```tsx
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
```

- Uses `useEffect` to load patient data and activity logs when the component mounts.
- Handles loading and error states appropriately.

### Logout Functionality

```tsx
const handleLogout = () => {
  localStorage.removeItem('token');
  navigate('/');
};
```

- Clears the authentication token from local storage.
- Redirects the user to the home page.

## Notes

- Ensure that `patientData` and `activityLogs` are properly structured and available in the data directory.
- Styles are imported from `dashboard-styles.css` for better UI presentation.
- Requires authentication handling to restrict unauthorized access to the dashboard.

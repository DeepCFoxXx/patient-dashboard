const API_BASE_URL = "http://localhost:5001/api";

export const fetchActivityLogs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/activity-logs`);
    if (!response.ok) {
      throw new Error(`Failed to fetch activity logs: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching activity logs:", error);
    return [];
  }
};

export const fetchPatientData = async () => {
    try {
      console.log("Fetching patient data from:", `${API_BASE_URL}/patients`);

      const response = await fetch(`${API_BASE_URL}/patients`);
      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`Failed to fetch patient data: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Patient data received:", data);

      return data;
    } catch (error) {
      console.error("Error fetching patient data:", error);
      return null;
    }
  };


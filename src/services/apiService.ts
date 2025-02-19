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
      const response = await fetch(`${API_BASE_URL}/patients`);
      if (!response.ok) {
        throw new Error(`Failed to fetch patient data: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching patient data:", error);
      return null;
    }
  };


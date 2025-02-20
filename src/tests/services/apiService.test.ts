import { fetchActivityLogs, fetchPatientData } from '../../services/apiService';

global.fetch = jest.fn();

describe('apiService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchActivityLogs', () => {
    it('should fetch activity logs successfully', async () => {
      const mockActivityLogs = [
        { activityLogId: "2052d792-5372-4c03-b579-944f7783f256", activityType: "ASSIST_MODE" },
      ];
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockActivityLogs,
      });

      const result = await fetchActivityLogs();
      expect(result).toEqual(mockActivityLogs);
      expect(fetch).toHaveBeenCalledWith('http://localhost:5001/api/activity-logs');
    });

    it('should return an empty array if fetching activity logs fails', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        statusText: 'Internal Server Error',
      });

      const result = await fetchActivityLogs();
      expect(result).toEqual([]);
      expect(fetch).toHaveBeenCalledWith('http://localhost:5001/api/activity-logs');
    });

    it('should handle fetch errors gracefully', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      const result = await fetchActivityLogs();
      expect(result).toEqual([]);
      expect(fetch).toHaveBeenCalledWith('http://localhost:5001/api/activity-logs');
    });
  });

  describe('fetchPatientData', () => {
    it('should fetch patient data successfully', async () => {
      const mockPatientData = [
        { patientId: "d82315d2-5bda-4e11-be41-1924395c7f6b", firstName: "John", lastName: "Doe" },
      ];
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockPatientData,
      });

      const result = await fetchPatientData();
      expect(result).toEqual(mockPatientData);
      expect(fetch).toHaveBeenCalledWith('http://localhost:5001/api/patients');
    });

    it('should return null if fetching patient data fails', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        statusText: 'Internal Server Error',
      });

      const result = await fetchPatientData();
      expect(result).toBeNull();
      expect(fetch).toHaveBeenCalledWith('http://localhost:5001/api/patients');
    });

    it('should handle fetch errors gracefully', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      const result = await fetchPatientData();
      expect(result).toBeNull();
      expect(fetch).toHaveBeenCalledWith('http://localhost:5001/api/patients');
    });
  });
});

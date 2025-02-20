import express from 'express';
import request from 'supertest';
import ActivityLog from '../../models/activityLog';
import activityLogsRouter from '../../routes/activityLogs';

jest.mock('../../models/activityLog');

const app = express();
app.use(express.json());
app.use('/api/activityLogs', activityLogsRouter);

export const activityLogData = {
  patientId: "d82315d2-5bda-4e11-be41-1924395c7f6b",
  sessionId: "a2dd2365-cf26-443a-b168-ac6a26f87bf6",
  activityLogId: "2052d792-5372-4c03-b579-944f7783f256",
  activityType: "ASSIST_MODE",
  timestamp: "2025-01-01T09:51:00",
  durationInSeconds: 1424,
  completedRepCount: 178,
  rpeScore: 8
};

describe('GET /api/activityLogs', () => {
  it('should return all activity logs', async () => {
    const mockActivityLogs = [activityLogData];
    ActivityLog.find.mockResolvedValue(mockActivityLogs);

    const response = await request(app).get('/api/activityLogs');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockActivityLogs);
  });

  it('should return a 500 error if fetching activity logs fails', async () => {
    ActivityLog.find.mockRejectedValue(new Error('Failed to fetch activity logs'));

    const response = await request(app).get('/api/activityLogs');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Failed to fetch activity logs' });
  });
});

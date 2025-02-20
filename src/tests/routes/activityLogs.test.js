import express from 'express';
import request from 'supertest';
import ActivityLog from '../../models/activityLog';
import activityLogsRouter from '../../routes/activityLogs';

jest.mock('../../models/activityLog');

const app = express();
app.use(express.json());
app.use('/api/activityLogs', activityLogsRouter);

describe('GET /api/activityLogs', () => {
  it('should return all activity logs', async () => {
    const mockActivityLogs = [
      { _id: '1', action: 'login', timestamp: '2023-01-01T00:00:00Z' },
      { _id: '2', action: 'logout', timestamp: '2023-01-02T00:00:00Z' },
    ];
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

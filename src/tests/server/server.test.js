import express from 'express';
import mongoose from 'mongoose';
import request from 'supertest';

jest.mock('mongoose');
jest.mock('../../middlewares/authMiddleware');
jest.mock('../../models/User');
jest.mock('../../models/Patient');
jest.mock('../../models/activityLog');

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

describe('Server', () => {
  beforeAll(() => {
    mongoose.connect.mockResolvedValue();
  });

  afterAll(() => {
    mongoose.disconnect.mockResolvedValue();
  });

  it('should respond with API is running...', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('API is running...');
  });

});

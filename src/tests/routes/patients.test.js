import express from 'express';
import request from 'supertest';
import Patient from '../../models/Patient';
import patientsRouter from '../../routes/patients';

jest.mock('../../models/Patient');

const app = express();
app.use(express.json());
app.use('/api/patients', patientsRouter);

export const patientData = {
  patientId: "d82315d2-5bda-4e11-be41-1924395c7f6b",
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: "1950-05-05",
  dateCreated: "2024-12-25T13:14:15",
};

describe('GET /api/patients', () => {
  it('should return all patients', async () => {
    const mockPatients = [patientData];
    Patient.find.mockResolvedValue(mockPatients);

    const response = await request(app).get('/api/patients');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPatients);
  });

});

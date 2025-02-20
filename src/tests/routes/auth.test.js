import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import User from '../../models/User';
import authRouter from '../../routes/auth';

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../../models/User');

const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);

describe('POST /api/auth/register', () => {
  it('should register a new user', async () => {
    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashedPassword');
    User.prototype.save.mockResolvedValue();

    const response = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testUser', password: 'password123' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'User registered successfully' });
  });

  it('should return a 400 error if user already exists', async () => {
    User.findOne.mockResolvedValue({ username: 'testUser' });

    const response = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testUser', password: 'password123' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'User already exists' });
  });

  it('should return a 500 error if server error occurs', async () => {
    User.findOne.mockRejectedValue(new Error('Server error'));

    const response = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testUser', password: 'password123' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Server error' });
  });
});

describe('POST /api/auth/login', () => {
  it('should login a user and return a token', async () => {
    const mockUser = { _id: '1', username: 'testUser', password: 'hashedPassword', role: 'user' };
    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('testToken');

    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testUser', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Login successful', token: 'testToken' });
  });

  it('should return a 400 error if username is invalid', async () => {
    User.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'invalidUser', password: 'password123' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Invalid username or password' });
  });

  it('should return a 400 error if password is invalid', async () => {
    const mockUser = { _id: '1', username: 'testUser', password: 'hashedPassword', role: 'user' };
    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);

    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testUser', password: 'invalidPassword' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Invalid username or password' });
  });

  it('should return a 500 error if server error occurs', async () => {
    User.findOne.mockRejectedValue(new Error('Server error'));

    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testUser', password: 'password123' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Server error' });
  });
});

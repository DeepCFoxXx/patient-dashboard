import express from 'express';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import authMiddleware from '../../middlewares/authMiddleware';

const app = express();
app.use(express.json());

app.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Protected route accessed' });
});

describe('authMiddleware', () => {
  let token;

  beforeAll(() => {
    process.env.JWT_SECRET = 'testsecret';
    token = jwt.sign({ id: 'testuser' }, process.env.JWT_SECRET);
  });

  afterAll(() => {
    delete process.env.JWT_SECRET;
  });

  test('should return 401 if no token is provided', async () => {
    const res = await request(app).get('/protected');
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Access denied. No token provided.');
  });

  test('should return 401 if token is invalid', async () => {
    const res = await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer invalidtoken');
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Invalid token');
  });

  test('should call next and set req.user if token is valid', async () => {
    const res = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Protected route accessed');
  });

  test('should return 401 if token is expired', async () => {
    const expiredToken = jwt.sign({ id: 'testuser' }, process.env.JWT_SECRET, { expiresIn: '1ms' });
    await new Promise(resolve => setTimeout(resolve, 10)); // Wait for the token to expire

    const res = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${expiredToken}`);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Invalid token');
  });

  test('should return 401 if token is malformed', async () => {
    const malformedToken = 'malformed.token.here';

    const res = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${malformedToken}`);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Invalid token');
  });

  test('should return 401 if token has invalid signature', async () => {
    const invalidSignatureToken = jwt.sign({ id: 'testuser' }, 'wrongsecret');

    const res = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${invalidSignatureToken}`);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Invalid token');
  });
});
import request from 'supertest';
import app from '../src/app';
import db from '../src/config/db';

beforeAll(async () => {
  // Set up test database
  await db.migrate.latest();
  await db.seed.run();
});

afterAll(async () => {
  // Close database connection
  await db.destroy();
});

describe('User API Endpoints', () => {
  it('should get paginated users', async () => {
    const res = await request(app).get('/users?pageNumber=0&pageSize=2');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeLessThanOrEqual(2);
  });

  it('should count users', async () => {
    const res = await request(app).get('/users/count');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('count');
    expect(typeof res.body.count).toBe('number');
  });

  it('should get a user by ID', async () => {
    const users = await request(app).get('/users');
    const userId = users.body[0].id;
    
    const res = await request(app).get(`/users/${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', userId);
    expect(res.body).toHaveProperty('username');
    expect(res.body).toHaveProperty('email');
  });

  it('should create a new user', async () => {
    const newUser = {
      username: 'testuser',
      email: 'test@example.com',
      fullName: 'Test User'
    };
    
    const res = await request(app)
      .post('/users')
      .send(newUser);
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('username', newUser.username);
    expect(res.body).toHaveProperty('email', newUser.email);
  });
});

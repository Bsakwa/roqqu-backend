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

describe('Address API Endpoints', () => {
  let userId: number;
  let existingAddress: any;

  beforeEach(async () => {
    // Get a user ID for testing
    const users = await db('users').select('id').limit(1);
    userId = users[0].id;

    // Retrieve the existing address for the user
    existingAddress = await request(app).get(`/addresses/${userId}`);
  });

  it('should get an address by user ID', async () => {
    const res = await request(app).get(`/addresses/${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('userId', userId);
    expect(res.body).toHaveProperty('street');
    expect(res.body).toHaveProperty('city');
  });

  it('should update an existing address', async () => {
    // Verify we have an existing address first
    expect(existingAddress.statusCode).toEqual(200);
    
    const updateData = {
      street: '456 Updated St',
      city: 'Updated City'
    };
    
    const res = await request(app)
      .patch(`/addresses/${userId}`)
      .send(updateData);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('userId', userId);
    expect(res.body).toHaveProperty('street', updateData.street);
    expect(res.body).toHaveProperty('city', updateData.city);

    // Optional: Verify the update persisted by fetching the address again
    const verifyRes = await request(app).get(`/addresses/${userId}`);
    expect(verifyRes.body.street).toEqual(updateData.street);
    expect(verifyRes.body.city).toEqual(updateData.city);
  });

  it('should create a new address', async () => {
    // Create a new user first
    const newUser = {
      username: 'addresstest',
      email: 'addresstest@example.com',
      fullName: 'Address Test'
    };
    
    const userRes = await request(app)
      .post('/users')
      .send(newUser)
    
    const newUserId = userRes.body.id;
    
    const newAddress = {
      userId: newUserId,
      street: '123 Test St',
      city: 'Test City',
      state: 'Test State',
      country: 'Test Country',
      zipCode: '12345'
    };
    
    const res = await request(app)
      .post('/addresses')
      .send(newAddress);
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('userId', newUserId);
    expect(res.body).toHaveProperty('street', newAddress.street);
    expect(res.body).toHaveProperty('city', newAddress.city);
  });
});

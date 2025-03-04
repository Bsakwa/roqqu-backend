import request from 'supertest';
import app from '../src/app';
import db from '../src/config/db';

// Define an interface for the Post type to match your database schema
interface Post {
  id?: number;
  userId: number;
  title: string;
  body: string;
}

beforeAll(async () => {
  // Set up test database
  await db.migrate.latest();
  await db.seed.run();
});

afterAll(async () => {
  // Close database connection
  await db.destroy();
});

describe('Post API Endpoints', () => {
  let userId: number;
  let postId: number;

  beforeEach(async () => {
    // Get a user ID for testing
    const users = await db('users').select('id').limit(1);
    userId = users[0].id;
    
    // Get a post ID for testing
    const posts = await db('posts').select('id').limit(1);
    postId = posts[0].id;
  });

  it('should get posts by user ID', async () => {
    const res = await request(app).get(`/posts?userId=${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    
    // Explicitly type the post parameter
    res.body.forEach((post: Post) => {
      expect(post).toHaveProperty('userId', userId);
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('body');
    });
  });

  it('should create a new post', async () => {
    const newPost: Post = {
      userId,
      title: 'Test Post',
      body: 'This is a test post content.'
    };
    
    const res = await request(app)
      .post('/posts')
      .send(newPost);
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('userId', userId);
    expect(res.body).toHaveProperty('title', newPost.title);
    expect(res.body).toHaveProperty('body', newPost.body);
  });

  it('should delete a post', async () => {
    // Create a post to delete
    const newPost: Post = {
      userId,
      title: 'Post to Delete',
      body: 'This post will be deleted.'
    };
    
    const createRes = await request(app)
      .post('/posts')
      .send(newPost);
    
    const createdPostId = createRes.body.id;
    
    const res = await request(app).delete(`/posts/${createdPostId}`);
    expect(res.statusCode).toEqual(204);
    
    // Verify post is deleted
    const checkRes = await db('posts').where('id', createdPostId).first();
    expect(checkRes).toBeUndefined();
  });
});

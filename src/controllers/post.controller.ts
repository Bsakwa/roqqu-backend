import { Request, Response } from 'express';
import db from '../config/db';
import { Post } from '../models/user.model';

export const getPostsByUserId = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.query.userId as string);
    
    if (!userId) {
      res.status(400).json({ error: 'User ID is required' });
      return;
    }

    // Check if user exists
    const user = await db('users').where('id', userId).first();
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const posts = await db('posts').where('userId', userId).select('*');
    
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, title, body } = req.body;
    
    // Check if user exists
    const user = await db('users').where('id', userId).first();
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const newPost: Post = {
      userId,
      title,
      body
    };

    const [postId] = await db('posts').insert(newPost);

    const createdPost = await db('posts').where('id', postId).first();
    
    //res.status(201).json(newPost);
    // return new post as in the database
    res.status(201).json(createdPost);


  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const postId = parseInt(req.params.id);
    
    // Check if post exists
    const post = await db('posts').where('id', postId).first();
    
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    await db('posts').where('id', postId).delete();
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

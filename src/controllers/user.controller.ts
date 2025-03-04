import { Request, Response } from 'express';
import db from '../config/db';
import { User } from '../models/user.model';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const pageNumber = parseInt(req.query.pageNumber as string) || 0;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const offset = pageNumber * pageSize;

    const users = await db('users')
      .select('*')
      .limit(pageSize)
      .offset(offset);

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getUserCount = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await db('users').count('id as count').first();
    const count = result ? result.count : 0;

    res.status(200).json({ count });
  } catch (error) {
    console.error('Error counting users:', error);
    res.status(500).json({ error: 'Failed to count users' });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    
    const user = await db('users').where('id', userId).first();
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Get user's address if it exists
    const address = await db('addresses').where('userId', userId).first();
    
    res.status(200).json({
      ...user,
      address: address || null
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, fullName } = req.body;
    
    // Check if username or email already exists
    const existingUser = await db('users')
      .where('username', username)
      .orWhere('email', email)
      .first();
    
    if (existingUser) {
      res.status(409).json({ error: 'Username or email already exists' });
      return;
    }

    const newUser: User = {
      username,
      email,
      fullName
    };

    const [userId] = await db('users').insert(newUser);
    const createdUser = await db('users').where('id', userId).first();
    
    // return the new user and join the id in the body
    res.status(201).json(createdUser);

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

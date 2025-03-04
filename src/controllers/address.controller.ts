import { Request, Response } from 'express';
import db from '../config/db';
import { Address } from '../models/user.model';


export const getAddressByUserId = async (req: Request, res: Response): Promise<void> => {
  try {
    
    // define userID
    const userId = parseInt(req.params.userId);
    
    // Check if user exists
    const user = await db('users').where('id', userId).first();
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const address = await db('addresses').where('userId', userId).first();
    
    if (!address) {
      res.status(404).json({ error: 'Address not found for this user' });
      return;
    }
    
    res.status(200).json(address);
  } catch (error) {
    console.error('Error fetching address:', error);
    res.status(500).json({ error: 'Failed to fetch address' });
  }
};

export const createAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, street, city, state, country, zipCode } = req.body;
    
    // Check if user exists
    const user = await db('users').where('id', userId).first();
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Check if user already has an address
    const existingAddress = await db('addresses').where('userId', userId).first();
    
    if (existingAddress) {
      res.status(409).json({ error: 'User already has an address' });
      return;
    }

    const newAddress: Address = {
      userId,
      street,
      city,
      state,
      country,
      zipCode
    };

    const [addressId] = await db('addresses').insert(newAddress)
    
    const createdAddress = await db('addresses').where('id', addressId).first();

    res.status(201).json(createdAddress);


  } catch (error) {
    console.error('Error creating address:', error);
    res.status(500).json({ error: 'Failed to create address' });
  }
};

export const updateAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    const { street, city, state, country, zipCode } = req.body;

    // Check if user exists
    const user = await db('users').where('id', userId).first();

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
 
    // Check if address exists for this user
    const existingAddress = await db('addresses').where('userId', userId).first();
    
    if (!existingAddress) {
      res.status(404).json({ error: 'Address not found for this user' });
      return;
    }

    const updatedAddress = {
      street: street || existingAddress.street,
      city: city || existingAddress.city,
      state: state || existingAddress.state,
      country: country || existingAddress.country,
      zipCode: zipCode || existingAddress.zipCode,
      updatedAt: new Date().toISOString()
    };

    await db('addresses')
      .where('userId', userId)
      .update(updatedAddress);
    
    const address = await db('addresses').where('userId', userId).first();
    
    res.status(200).json(address);
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ error: 'Failed to update address' });
  }
};

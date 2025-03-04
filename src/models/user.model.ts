export interface User {
  id?: number;
  username: string;
  email: string;
  fullName: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Address {
  id?: number;
  userId: number;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Post {
  id?: number;
  userId: number;
  title: string;
  body: string;
  createdAt?: string;
  updatedAt?: string;
}

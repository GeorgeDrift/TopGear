
import { User, UserRole } from '../../types';
import { mockDb } from '../data/store';

export const createUser = async (data: Partial<User>): Promise<User> => {
  const existing = mockDb.users.find(u => u.email === data.email);
  if (existing) throw new Error('Email already registered');

  const newUser: User = {
    id: `u-${Date.now()}`,
    name: data.name || 'User',
    email: data.email || '',
    role: data.role || UserRole.CLIENT,
    dealershipName: data.dealershipName,
    isSubscriptionActive: true, 
  };

  mockDb.users.push(newUser);
  return newUser;
};

export const loginUser = async (email: string, pass: string) => {
  const user = mockDb.users.find(u => u.email === email);
  if (!user) throw new Error('Invalid credentials');

  return {
    token: 'mock-jwt-token-' + user.id,
    user
  };
};

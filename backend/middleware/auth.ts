
import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../../types';
import { mockDb } from '../data/store';

// Fix: Using any for parameters to resolve missing property errors (headers, status) and callable issues for next()
export const authenticate = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  // Mock verification: extract ID from token
  const userId = token.replace('mock-jwt-token-', '');
  const user = mockDb.users.find(u => u.id === userId);

  if (!user) return res.status(401).json({ message: 'Invalid token' });

  req.user = user;
  next();
};

// Fix: Using any for parameters to resolve missing property errors (status) and callable issues for next()
export const authorize = (roles: UserRole[]) => {
  return (req: any, res: any, next: any) => {
    const user = req.user;
    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
    }
    next();
  };
};

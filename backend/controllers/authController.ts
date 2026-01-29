
import * as authService from '../services/authService';

export const register = async (req: any, res: any) => {
  try {
    const userData = req.body;
    const user = await authService.createUser(userData);
    res.status(201).json({ success: true, user });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.status(200).json({ success: true, ...result });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
};

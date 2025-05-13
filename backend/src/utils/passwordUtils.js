import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = (password) => bcrypt.hash(password, 10);

export const comparePassword = (inputPassword, hashedPassword) =>
  bcrypt.compare(inputPassword, hashedPassword);

export const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });


import mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const User = mongoose.model('User', UserSchema);

/**
 * Controller for authentication
 */
export class AuthController {
  /**
   * Login user with email and password
   * @param  {Request} req - express request object with user credentials
   * @param  {Response} res — express response object
   * @return json object with statusCode and JWT
   */
  public async login(req: Request, res: Response): Promise<void> {
    try {
      // find user
      const user = await User.findOne({
        email: req.body.email
      });

      if (user === null) {
        throw new Error('User credentials are wrong.');
      }

      // compare password
      const match = await bcrypt.compare(req.body.password, user.password);

      if (!match) {
        throw new Error('User credentials are wrong.');
      }

      // generate JWT
      const token = jwt.sign({ userId: user.id }, 'SECRET');

      res.json({
        statusCode: 200,
        jwt: token
      });
    } catch (err) {
      res.json({
        statusCode: 400,
        errorMessage: err.message || err.toString()
      });
    }
  }
}

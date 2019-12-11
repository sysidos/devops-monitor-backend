import mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

const User = mongoose.model('User', UserSchema);

/**
 * CRUD-Controller for user models
 */
export class UserController {
  /**
   * Creates a new user record
   * @param  {Request} req - express request object with updated user details in body
   * @param  {Response} res — express response object
   * @return json object with statusCode and and created user
   */
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const saltRounds = 10;
      const password = await bcrypt.hash(req.body.password, saltRounds);

      const newUser = new User({
        password,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      });
      const user = await newUser.save();

      res.json({
        statusCode: 200,
        data: user
      });
    } catch (err) {
      res.json({
        statusCode: 400,
        errorMessage: err.message || err.toString()
      });
    }
  }

  /**
   * Displays details of specific user record
   * @param  {Request} req - express request object with userId parameter
   * @param  {Response} res — express response object
   * @return json object with statusCode and user details
   */
  public async find(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findById(req.params.userId);

      res.json({
        statusCode: 200,
        data: user
      });
    } catch (err) {
      res.json({
        statusCode: 400,
        errorMessage: err.message || err.toString()
      });
    }
  }

  /**
   * Updates a specific user record
   * @param  {Request} req - express request object with userId parameter and new user attributes
   * @param  {Response} res — express response object
   * @return json object with statusCode and updated user details
   */
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findOneAndUpdate({
        _id: req.params.userId
      }, {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      }, { new: true });

      res.json({
        statusCode: 200,
        data: user
      });
    } catch (err) {
      res.json({
        statusCode: 400,
        errorMessage: err.message || err.toString()
      });
    }
  }
}

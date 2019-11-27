import mongoose from 'mongoose';
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../interfaces/authRequest';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('User', UserSchema);

/**
 * Middleware to check if user can access the project id
 * @param  {AuthRequest} req - express request object
 * @param  {Response} res — express response object
 */
export const userHasAccessToProjectId = async (req: AuthRequest, res: Response, next: NextFunction) => {
  // fetch user
  const user = await User.findOne({
    _id: req.user.userId
  });

  // check if user has project id
  if (!user.projects.includes(req.params.projectId)) {
    res.json({
      statusCode: 403,
      errorMessage: 'no access to this instance'
    });
    return;
  }

  next();
};

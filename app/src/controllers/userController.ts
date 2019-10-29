import mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
import { Request, Response } from 'express';

const User = mongoose.model('User', UserSchema);

/**
 * CRUD-Controller for user models
 */
export class UserController {

    /**
     * lists all available users
     * @param  req express request object
     * @param  res express response object
     * @return     json object with statusCode and list of users
     */
    public async index (req: Request, res: Response) {
        try {
            const users = await User.find();
            res.json(users);
        } catch(err) {
            res.send(err);
        }
    }

    /**
     * creates a new user instance
     * @param  req express request object with updated user details as parameters
     * @param  res express response object
     * @return     json object with statusCode and and created user
     */
    public async create (req: Request, res: Response) {
        try {
            let newUser = new User(req.body);
            const user = await newUser.save();
            res.json(user);
        } catch(err) {
            res.send(err);
        }
    }

    /**
     * displays details of specific user instance
     * @param  req express request object with userId parameter
     * @param  res express response object
     * @return     json object with statusCode and user details
     */
    public async find (req: Request, res: Response) {
        try {
            const user = await User.findById(req.params.userId);
            res.json(user);
        } catch(err) {
            res.send(err);
        }
    }

    /**
     * updates a specific user instance
     * @param  req express request object with userId parameter
     * @param  res express response object
     * @return     json object with statusCode and updated user details
     */
    public async update (req: Request, res: Response) {
        try {
            const user = await User.findOneAndUpdate({
                _id: req.params.userId
            }, req.body, { new: true });
            res.json(user);
        } catch(err) {
            res.send(err);
        }
    }

    /**
     * deletes a specific user instance
     * @param  req express request object with userId parameter
     * @param  res express response object
     * @return     json object with statusCode
     */
    public async delete (req: Request, res: Response) {
        try {
            await User.deleteOne({
                _id: req.params.userId
            });
            res.json({ message: 'Successfully deleted user!'});
        } catch(err) {
            res.send(err);
        }
    }

}

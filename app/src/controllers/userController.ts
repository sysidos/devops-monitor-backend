import mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
import { Request, Response } from 'express';

const User = mongoose.model('User', UserSchema);

export class UserController {

    public async index (req: Request, res: Response) {
        try {
            const users = await User.find();
            res.json(users);
        } catch(err) {
            res.send(err);
        }
    }

    public async create (req: Request, res: Response) {
        try {
            let newUser = new User(req.body);
            const user = await newUser.save();
            res.json(user);
        } catch(err) {
            res.send(err);
        }
    }


    public async find (req: Request, res: Response) {
        try {
            const user = await User.findById(req.params.userId);
            res.json(user);
        } catch(err) {
            res.send(err);
        }
    }

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

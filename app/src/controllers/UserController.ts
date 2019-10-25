import mongoose from 'mongoose';
import { UserSchema } from '../models/UserModel';
import { Request, Response } from 'express';

const User = mongoose.model('User', UserSchema);

export class UserController{

    public index (req: Request, res: Response) {
        User.find({}, (err, user) => {
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }

    public create (req: Request, res: Response) {
        let newUser = new User(req.body);

        newUser.save((err, user) => {
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }


    public find (req: Request, res: Response) {
        User.findById(req.params.userId, (err, user) => {
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }

    public update (req: Request, res: Response) {
        User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, user) => {
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }

    public delete (req: Request, res: Response) {
        User.remove({ _id: req.params.userId }, (err, user) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted user!'});
        });
    }

}

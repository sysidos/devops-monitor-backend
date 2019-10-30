import mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
import { Request, Response } from 'express';

const User = mongoose.model('User', UserSchema);

/**
 * CRUD-Controller for user models
 */
export class UserController {

    /**
     * Lists all available users
     * @param  {Request} req - express request object
     * @param  {Response} res — express response object
     * @return json object with statusCode and list of users
     */
    public async index(req: Request, res: Response) {
        try {
            const users = await User.find();
            res.json({
                statusCode: 200,
                data: users
            });
        } catch(err) {
            res.json({
                statusCode: 400,
                errorMessage: err.message || err.toString()
            });
        }
    }

    /**
     * Creates a new user record
     * @param  {Request} req - express request object with updated user details in body
     * @param  {Response} res — express response object
     * @return json object with statusCode and and created user
     */
    public async create(req: Request, res: Response) {
        try {
            let newUser = new User({
                name: req.body.name,
                email: req.body.email,
            });
            const user = await newUser.save();
            res.json({
                statusCode: 200,
                data: user
            });
        } catch(err) {
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
    public async find(req: Request, res: Response) {
        try {
            const user = await User.findById(req.params.userId);
            res.json({
                statusCode: 200,
                data: user
            });
        } catch(err) {
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
    public async update(req: Request, res: Response) {
        try {
            const user = await User.findOneAndUpdate({
                _id: req.params.userId
            }, {
                name: req.body.name,
                email: req.body.email,
            }, { new: true });
            res.json({
                statusCode: 200,
                data: user
            });
        } catch(err) {
            res.json({
                statusCode: 400,
                errorMessage: err.message || err.toString()
            });
        }
    }

    /**
     * Deletes a specific user record
     * @param  {Request} req - express request object with userId parameter
     * @param  {Response} res — express response object
     * @return json object with statusCode
     */
    public async delete(req: Request, res: Response) {
        try {
            await User.deleteOne({
                _id: req.params.userId
            });
            res.json({
                statusCode: 200
            });
        } catch(err) {
            res.json({
                statusCode: 400,
                errorMessage: err.message || err.toString()
            });
        }
    }

}

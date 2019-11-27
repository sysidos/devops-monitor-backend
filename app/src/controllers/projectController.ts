import mongoose from 'mongoose';
import { ProjectSchema } from '../models/projectModel';
import { UserSchema } from '../models/userModel';
import { Response } from 'express';
import { AuthRequest } from '../interfaces/authRequest';

const Project = mongoose.model('Project', ProjectSchema);
const User = mongoose.model('User', UserSchema);

/**
 * CRUD-Controller for project models
 */
export class ProjectController {
  /**
   * Lists all available projects
   * @param  {AuthRequest} req - express request object
   * @param  {Response} res — express response object
   * @return json object with statusCode and list of projects
   */
  public async index(req: AuthRequest, res: Response) {
    try {
      const user = await User.findOne({
        _id: req.user.userId
      }).populate('projects');

      res.json({
        statusCode: 200,
        data: user.projects
      });
    } catch (err) {
      res.json({
        statusCode: 400,
        errorMessage: err.message || err.toString()
      });
    }
  }

  /**
   * Creates a new project record
   * @param  {AuthRequest} req - express request object with updated project details in body
   * @param  {Response} res — express response object
   * @return json object with statusCode and and created project
   */
  public async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const newProject = new Project({
        name: req.body.name,
        picture: req.body.picture
      });
      const project = await newProject.save();

      // retrieve authed user that project should be assigned to
      const user = await User.findOne({
        _id: req.user.userId
      });

      user.projects.push(project._id);
      await user.save();

      res.json({
        statusCode: 200,
        data: project
      });
    } catch (err) {
      res.json({
        statusCode: 400,
        errorMessage: err.message || err.toString()
      });
    }
  }

  /**
   * Displays details of specific project record
   * @param  {AuthRequest} req - express request object with projectId parameter
   * @param  {Response} res — express response object
   * @return json object with statusCode and project details
   */
  public async find(req: AuthRequest, res: Response): Promise<void> {
    try {
      const project = await Project.findById(req.params.projectId);

      res.json({
        statusCode: 200,
        data: project
      });
    } catch (err) {
      res.json({
        statusCode: 400,
        errorMessage: err.message || err.toString()
      });
    }
  }

  /**
   * Updates a specific project record
   * @param  {AuthRequest} req - express request object with projectId parameter and new project attributes
   * @param  {Response} res — express response object
   * @return json object with statusCode and updated project details
   */
  public async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const project = await Project.findOneAndUpdate({
        _id: req.params.projectId
      }, {
        name: req.body.name,
        picture: req.body.picture
      }, { new: true });

      res.json({
        statusCode: 200,
        data: project
      });
    } catch (err) {
      res.json({
        statusCode: 400,
        errorMessage: err.message || err.toString()
      });
    }
  }

  /**
   * Deletes a specific project record
   * @param  {AuthRequest} req - express request object with projectId parameter
   * @param  {Response} res — express response object
   * @return json object with statusCode
   */
  public async delete(req: AuthRequest, res: Response) {
    try {
      await Project.deleteOne({
        _id: req.params.projectId
      });
      res.json({
        statusCode: 200
      });
    } catch (err) {
      res.json({
        statusCode: 400,
        errorMessage: err.message || err.toString()
      });
    }
  }
}

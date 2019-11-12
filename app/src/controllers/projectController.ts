import mongoose from 'mongoose';
import { ProjectSchema } from '../models/projectModel';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

const Project = mongoose.model('Project', ProjectSchema);

/**
 * CRUD-Controller for project models
 */
export class ProjectController {
  /**
   * Lists all available projects
   * @param  {Request} req - express request object
   * @param  {Response} res — express response object
   * @return json object with statusCode and list of projects
   */
  public async index(req: Request, res: Response) {
    try {
      const projects = await Project.find();

      res.json({
        statusCode: 200,
        data: projects
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
   * @param  {Request} req - express request object with updated project details in body
   * @param  {Response} res — express response object
   * @return json object with statusCode and and created project
   */
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const newProject = new Project({
        name: req.body.name,
        picture: req.body.picture
      });
      const project = await newProject.save();

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
   * @param  {Request} req - express request object with projectId parameter
   * @param  {Response} res — express response object
   * @return json object with statusCode and project details
   */
  public async find(req: Request, res: Response): Promise<void> {
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
   * @param  {Request} req - express request object with projectId parameter and new project attributes
   * @param  {Response} res — express response object
   * @return json object with statusCode and updated project details
   */
  public async update(req: Request, res: Response): Promise<void> {
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
   * @param  {Request} req - express request object with projectId parameter
   * @param  {Response} res — express response object
   * @return json object with statusCode
   */
  public async delete(req: Request, res: Response) {
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

import mongoose from 'mongoose';
import { ProjectSchema } from '../models/projectModel';
import { UserSchema } from '../models/userModel';
import { ServiceSchema } from '../models/serviceModel';
import { Request, Response } from 'express';

const Project = mongoose.model('Project', ProjectSchema);
const User = mongoose.model('User', UserSchema);
const Service = mongoose.model('Service', ServiceSchema);

/**
 * CRUD-Controller for service models
 */
export class ServiceController {
  /**
   * Creates a new service record
   * @param  {AuthRequest} req - express request object with service details in body
   * @param  {Response} res — express response object
   * @return json object with statusCode and and created service
   */
  public async create(req: Request, res: Response): Promise<void> {
    try {
      // check if project for token is existing
      const project = await Project.findOne({
        token: req.body.project_token
      });

      if (project === null) {
        res.json({
          statusCode: 404,
          errorMessage: 'Project not found'
        });
        return;
      }

      // create new service entry
      const newService = new Service({
        project: project.id,
        name: req.body.name,
        payload: req.body.payload
      });
      const service = await newService.save();

      res.json({
        statusCode: 200,
        service
      });
    } catch (err) {
      res.json({
        statusCode: 400,
        errorMessage: err.message || err.toString()
      });
    }
  }
}

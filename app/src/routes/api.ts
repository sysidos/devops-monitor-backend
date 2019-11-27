import { Request, Response } from 'express';
import { AuthController } from '../controllers/authController';
import { ProjectController } from '../controllers/projectController';
import { UserController } from '../controllers/userController';
import jwt from 'express-jwt';
import { userHasAccessToProjectId } from '../middleware/projectAccess';

/**
 * Express router
 */
export class Routes {
    public AuthController: AuthController = new AuthController()
    public UserController: UserController = new UserController()
    public ProjectController: ProjectController = new ProjectController()

    /**
     * Express routes
     * @param app express Application
     */
    public routes(app): void {
      // default root route
      app.route('/')
        .get((req: Request, res: Response) => {
          res.status(200).send({
            message: 'codex devops monitor api!'
          });
        });

      // Authentication
      app.route('/auth/login')
        .post(this.AuthController.login);

      // User
      app.route('/users')
        .post(this.UserController.create);
      app.route('/users/:userId')
        .get(this.UserController.find)
        .put(this.UserController.update);

      // Projects
      app.route('/projects')
        .get(
          jwt({ secret: process.env.JWT_SECRET }),
          this.ProjectController.index
        )
        .post(
          jwt({ secret: process.env.JWT_SECRET }),
          this.ProjectController.create
        );
      app.route('/projects/:projectId')
        .get(
          jwt({ secret: process.env.JWT_SECRET }),
          userHasAccessToProjectId,
          this.ProjectController.find
        )
        .put(
          jwt({ secret: process.env.JWT_SECRET }),
          userHasAccessToProjectId,
          this.ProjectController.update
        )
        .delete(
          jwt({ secret: process.env.JWT_SECRET }),
          userHasAccessToProjectId,
          this.ProjectController.delete
        );
    }
}

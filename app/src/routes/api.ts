import { Request, Response } from 'express';
import { AuthController } from '../controllers/authController';
import { ProjectController } from '../controllers/projectController';
import { UserController } from '../controllers/userController';

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
        .get(this.ProjectController.index)
        .post(this.ProjectController.create);
      app.route('/projects/:projectId')
        .get(this.ProjectController.find)
        .put(this.ProjectController.update)
        .delete(this.ProjectController.delete);
    }
}

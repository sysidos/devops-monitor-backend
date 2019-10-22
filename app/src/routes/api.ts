import {Request, Response, NextFunction} from "express";
import { UserController } from "../controllers/UserController";

export class Routes {

    public UserController: UserController = new UserController()

    public routes(app): void {

        // default root route
        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'codex devops monitor api!'
            })
        })

        // User
        app.route('/users')
            .get(this.UserController.index)
            .post(this.UserController.create);
        app.route('/users/:userId')
            .get(this.UserController.find)
            .put(this.UserController.update)
            .delete(this.UserController.delete)

    }
}

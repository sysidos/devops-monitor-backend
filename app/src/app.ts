import express from 'express';
import bodyParser from 'body-parser';
import { Routes } from './routes/api';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

/**
 * Main app to configure express server with mongo connection
 */
class App {
    public app: express.Application = express();
    public routes: Routes = new Routes();

    /**
     * Run several other configuration methods and mount routes
     */
    constructor() {
      dotenv.config();
      this.config();
      this.mongoSetup();
      this.routes.routes(this.app);
    }

    /**
     * Configuration for express server
     */
    private config(): void {
      // access json and form data in requests
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: false }));
      // serving static files
      this.app.use(express.static('public'));
    }

    /**
     * connect to mongoDB
     */
    private mongoSetup(): void {
      mongoose.connect(process.env.MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      });
    }
}

export default new App().app;

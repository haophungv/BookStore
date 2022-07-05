import { errorHandling } from "./exceptions/exception";
import * as express from "express";
import * as bodyParser from "body-parser";

import * as dotenv from "dotenv";
dotenv.config();

import {
  adminRouter,
  usersRouter,
  booksRouter,
  cartsRouter,
} from "./routes/index";
import * as cors from "cors";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    const corsOptions = {
      origin: ["*", process.env.APP_ANGULAR_URL],
      credentials: true,
    };
    this.app.use(cors(corsOptions));
    this.app.use("/authentication/user", usersRouter);
    this.app.use("/authentication/admin", adminRouter);
    this.app.use("/products/books", booksRouter);
    this.app.use("/products/carts", cartsRouter);
    this.app.use(errorHandling);
  }
}

export default new App().app;

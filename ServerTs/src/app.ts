import * as express from "express";
import * as bodyParser from "body-parser";
import { adminRouter } from "./routes/admin.routes";
import { usersRouter } from "./routes/users.routes";
import { booksRouter } from "./routes/books.routes";
import { cartsRouter } from "./routes/carts.routes";
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
      origin: ["*", "http://localhost:4200"],
      credentials: true,
    };
    this.app.use(cors(corsOptions));
    this.app.use("/authentication/user", usersRouter);
    this.app.use("/authentication/admin", adminRouter);
    this.app.use("/products/books", booksRouter);
    this.app.use("/products/carts", cartsRouter);

    // this.app.use(express.static(__dirname + "/src"));
  }
}

export default new App().app;

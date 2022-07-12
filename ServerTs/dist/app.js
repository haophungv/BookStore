"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exception_1 = require("./exceptions/exception");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const index_1 = require("./routes/index");
const cors = require("cors");
class App {
    constructor() {
        this.app = express();
        this.config();
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        const corsOptions = {
            origin: ["*", process.env.APP_ANGULAR_URL],
            credentials: true,
        };
        this.app.use(cors(corsOptions));
        this.app.use("/authentication/user", index_1.usersRouter);
        this.app.use("/authentication/admin", index_1.adminRouter);
        this.app.use("/products/books", index_1.booksRouter);
        this.app.use("/products/carts", index_1.cartsRouter);
        this.app.use(exception_1.errorHandling);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map
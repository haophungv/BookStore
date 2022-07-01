import app from "./app";

// import http from 'http';
import * as express from "express";
import * as bodyParser from "body-parser";
import { http } from "http-proxy";

import config from "./config/config";
// import bookRoutes from './routes/book';
import mongoose from "mongoose";

mongoose.connect(config.mongo.url, config.mongo.options);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

const PORT = 3000;
app.set("port", PORT);

// app.all("/space/*", function (req, res) {
//   console.log("Request made to /space/");
// });

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

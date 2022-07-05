import app from "./app";
import * as dotenv from "dotenv";

dotenv.config();

import config from "./config/config";

import mongoose from "mongoose";

mongoose.connect(process.env.APP_MONGODB_URL, config.mongo.options);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

const PORT = 3000;
app.set("port", PORT);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

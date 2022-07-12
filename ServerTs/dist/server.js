"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dotenv = require("dotenv");
dotenv.config();
const config_1 = require("./config/config");
const mongoose_1 = require("mongoose");
mongoose_1.default.connect(process.env.APP_MONGODB_URL, config_1.default.mongo.options);
const db = mongoose_1.default.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));
const PORT = 3000;
app_1.default.set("port", PORT);
app_1.default.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
//# sourceMappingURL=server.js.map
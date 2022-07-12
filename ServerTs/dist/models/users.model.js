"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UsersSchema = new mongoose_1.Schema({
    name: { name: "name", type: String, require: true },
    username: { name: "username", type: String, require: true },
    password: { name: "password", type: String, require: true },
    phoneNumber: { name: "phoneNumber", type: String },
    email: { name: "phoneNumber", type: String },
});
UsersSchema.post("save", function () {
    // logging.info('Mongo', 'Checkout the book we just saved: ', this);
});
exports.default = mongoose_1.default.model("Users", UsersSchema);
//# sourceMappingURL=users.model.js.map
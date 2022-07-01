import mongoose, { Schema } from "mongoose";

import Users from "../interfaces/users.interfaces";

const UsersSchema: Schema = new Schema({
  name: { name: "name", type: String, require: true },
  username: { name: "username", type: String, require: true },
  password: { name: "password", type: String, require: true },
  phoneNumber: { name: "phoneNumber", type: String },
  email: { name: "phoneNumber", type: String },
});

UsersSchema.post<Users>("save", function () {
  // logging.info('Mongo', 'Checkout the book we just saved: ', this);
});

export default mongoose.model<Users>("Users", UsersSchema);

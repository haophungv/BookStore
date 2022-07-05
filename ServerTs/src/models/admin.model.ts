import mongoose, { Schema } from "mongoose";

// import Admin from "../interfaces/admin.interfaces";
import { Admin } from "../interfaces/index";

const AdminSchema: Schema = new Schema({
  name: { name: "name", type: String, require: true },
  username: { name: "username", type: String, require: true },
  password: { name: "password", type: String, require: true },
  phoneNumber: { name: "phoneNumber", type: String },
  email: { name: "phoneNumber", type: String },
});

AdminSchema.post<Admin>("save", function () {
  // logging.info('Mongo', 'Checkout the book we just saved: ', this);
});

export default mongoose.model<Admin>("Admin", AdminSchema);

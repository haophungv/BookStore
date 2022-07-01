import { Document } from "mongoose";

export default interface Admin extends Document {
  name: string;
  username: string;
  password: string;
  phoneNumber: string;
  email: string;
}

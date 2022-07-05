import { Document } from "mongoose";
import { IsNotEmpty, IsString } from "class-validator";
export interface Users extends Document {
  name: string;
  username: string;
  password: string;
  phoneNumber: string;
  email: string;
}

export class UserLoginInput {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

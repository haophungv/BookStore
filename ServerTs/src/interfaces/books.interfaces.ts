import { Document } from "mongoose";

export default interface Books extends Document {
  title: string;
  image: string;
  category: string;
  quantity: number;
  price: number;
  description: string;
}

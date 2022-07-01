import { Document } from "mongoose";

export interface BookInCarts {
  title: string;
  image: string;
  category: string;
  quantity: number;
  price: number;
  description: string;
  amount: number;
}

export default interface Carts extends Document {
  customerId: string;
  books: [BookInCarts];
}

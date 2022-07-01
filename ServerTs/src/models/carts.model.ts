import { BookInCarts } from "./../interfaces/carts.interface";
import mongoose, { Schema } from "mongoose";
import Carts from "../interfaces/carts.interface";

const CartsSchema: Schema = new Schema({
  customerId: { name: "customerId", type: String, require: true },
  books: { name: "books", type: Array },
});

CartsSchema.post<Carts>("save", function () {
  // logging.info('Mongo', 'Checkout the book we just saved: ', this);
});

export default mongoose.model<Carts>("Carts", CartsSchema);

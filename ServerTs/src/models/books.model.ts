import mongoose, { Schema } from "mongoose";

import Books from "../interfaces/books.interfaces";

const BooksSchema: Schema = new Schema({
  title: { name: "title", type: String, require: true },
  image: { name: "image", type: String, require: true },
  category: { name: "category", type: String, require: true },
  quantity: { name: "quantity", type: Number, require: true },
  price: { name: "price", type: Number, require: true },
  description: { name: "description", type: String, require: true },
});

BooksSchema.post<Books>("save", function () {
  // logging.info('Mongo', 'Checkout the book we just saved: ', this);
});

export default mongoose.model<Books>("Books", BooksSchema);

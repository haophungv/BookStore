"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BooksSchema = new mongoose_1.Schema({
    title: { name: "title", type: String, require: true },
    image: { name: "image", type: String, require: true },
    category: { name: "category", type: String, require: true },
    quantity: { name: "quantity", type: Number, require: true },
    price: { name: "price", type: Number, require: true },
    description: { name: "description", type: String, require: true },
});
BooksSchema.post("save", function () {
    // logging.info('Mongo', 'Checkout the book we just saved: ', this);
});
exports.default = mongoose_1.default.model("Books", BooksSchema);
//# sourceMappingURL=books.model.js.map
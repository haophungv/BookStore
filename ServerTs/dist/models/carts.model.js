"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CartsSchema = new mongoose_1.Schema({
    customerId: { name: "customerId", type: String, require: true },
    books: { name: "books", type: Array },
});
CartsSchema.post("save", function () {
    // logging.info('Mongo', 'Checkout the book we just saved: ', this);
});
exports.default = mongoose_1.default.model("Carts", CartsSchema);
//# sourceMappingURL=carts.model.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const carts_model_1 = require("../models/carts.model");
const books_model_1 = require("../models/books.model");
const index_1 = require("./../exceptions/index");
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const dataReceive = req.body;
    const cartCreateInput = {
        books: dataReceive.map((item) => {
            return {
                bookId: item._id,
                quantity: item.amount,
                price: item.price,
                totalCosts: item.price * item.amount,
            };
        }),
    };
    const insertResult = yield carts_model_1.default.create(cartCreateInput);
    const result = yield carts_model_1.default.findById(insertResult._id.toHexString());
    if (!result) {
        // return res.status(500).json({
        //   message: "Problem getting created user from DB",
        // });
        return next(new index_1.InternalErrorException({ detail: "Something went wrong" }));
    }
    yield dataReceive.forEach((element) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(element);
        const dataToSave = {
            quantity: element.quantity - element.amount,
        };
        try {
            yield books_model_1.default.findOneAndUpdate({ title: element.title }, dataToSave);
        }
        catch (error) {
            // throw { status: 500, message: error.message };
            return next(new index_1.InternalErrorException({ detail: "Something went wrong" }));
        }
    }));
    return res.status(201).json({
        cart: cartCreateInput,
    });
});
const getCartByCustomerId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const dataReceive = req.params;
    const pipeline = [];
    const match = {
        customerId: dataReceive.customerId,
    };
    pipeline.push({
        $match: match,
    });
    pipeline.push({
        $limit: 20,
    });
    const result = yield carts_model_1.default.aggregate(pipeline).exec();
    console.log(result);
    if (result.length > 0) {
        return res.status(200).json({
            data: result,
        });
    }
    return res.status(404).json({
        message: "cart not found",
    });
});
const addBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const dataReceive = req.body;
});
exports.default = { create };
//# sourceMappingURL=carts.controller.js.map
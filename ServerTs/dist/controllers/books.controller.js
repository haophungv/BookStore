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
const exceptions_1 = require("./../exceptions");
const mongoose_1 = require("mongoose");
const books_model_1 = require("../models/books.model");
const index_1 = require("../exceptions/index");
var HttpStatus = require("http-status-codes");
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookCreateInput = req.body;
    const pipeline = [];
    const match = {
        title: bookCreateInput.title,
    };
    pipeline.push({
        $match: match,
    });
    pipeline.push({
        $limit: 20,
    });
    const bookInDb = yield books_model_1.default.aggregate(pipeline).exec();
    if (bookInDb.length > 0) {
        // return res.status(404).json({
        //   message: "book have already exist",
        // });
        return next(new exceptions_1.InternalErrorException({
            detail: "book have already exist",
        }));
    }
    const insertResult = yield books_model_1.default.create(bookCreateInput);
    const result = yield books_model_1.default.findById(insertResult._id.toHexString());
    if (!result) {
        // return res.status(500).json({
        //   message: "Problem getting created book from DB",
        // });
        return next(new exceptions_1.InternalErrorException({
            detail: "Something went wrong when create book",
        }));
    }
    return res.status(201).json({
        book: result,
    });
});
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_model_1.default.find().exec();
    console.log(result);
    if (result.length > 0) {
        // next(
        //   new HttpException(
        //     HttpStatus.INTERNAL_SERVER_ERROR,
        //     "something went wrong with books update"
        //   )
        // );
        return res.status(200).json({
            books: result,
            count: result.length,
        });
    }
    // return res.status(200);
    return next(new exceptions_1.NotFoundException({
        detail: "book not found",
    }));
});
const getByCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const dataReceive = req.params;
    const pipeline = [];
    const match = {
        category: dataReceive.category,
    };
    pipeline.push({
        $match: match,
    });
    pipeline.push({
        $limit: 20,
    });
    const result = yield books_model_1.default.aggregate(pipeline).exec();
    console.log(result);
    if (result.length > 0) {
        return res.status(200).json({
            data: result,
        });
    }
    // return res.status(404).json({
    //   message: "book not found",
    // });
    next(new exceptions_1.NotFoundException({ detail: "Book not found" }));
});
const getById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const dataReceive = req.params;
    const pipeline = [];
    const match = {
        _id: new mongoose_1.default.Types.ObjectId(dataReceive.id),
    };
    pipeline.push({
        $match: match,
    });
    pipeline.push({
        $limit: 20,
    });
    const result = yield books_model_1.default.aggregate(pipeline).exec();
    if (result.length > 0) {
        return res.status(200).json({
            data: result[0],
        });
    }
    // return res.status(404).json({
    //   message: "book not found",
    // });
    // throw new NotFoundException("Book not found");
    next(new exceptions_1.NotFoundException({ detail: "Book not found" }));
});
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const dataReceive = req.body;
    const dataToSave = {
        title: dataReceive.title,
        image: dataReceive.image,
        category: dataReceive.category,
        quantity: dataReceive.quantity,
        price: dataReceive.price,
        description: dataReceive.description,
    };
    try {
        yield books_model_1.default.findOneAndUpdate({ title: dataReceive.title }, dataToSave);
    }
    catch (error) {
        // throw { status: 500, message: error.message };
        next(new index_1.HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "something went wrong with books update"));
    }
    res.status(200).json({
        data: {
            message: "update book success",
        },
    });
});
const remove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const dataReceive = req.body;
    try {
        yield books_model_1.default.findOneAndDelete({ title: dataReceive.title });
    }
    catch (error) {
        throw { status: 500, message: error.message };
    }
    res.status(200).json({
        data: {
            message: "delete book success",
        },
    });
});
exports.default = { create, getAll, getByCategory, update, remove, getById };
//# sourceMappingURL=books.controller.js.map
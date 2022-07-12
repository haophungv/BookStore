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
const exceptions_1 = require("../exceptions");
var HttpStatus = require("http-status-codes");
const users_model_1 = require("../models/users.model");
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userCreateInput = req.body;
    const pipeline = [];
    const match = {
        username: userCreateInput.username,
    };
    pipeline.push({
        $match: match,
    });
    pipeline.push({
        $limit: 20,
    });
    const userInDb = yield users_model_1.default.aggregate(pipeline).exec();
    if (userInDb.length > 0) {
        // return res.status(404).json({
        //   message: "username have already exist",
        // });
        return next(new exceptions_1.InternalErrorException({
            detail: "username have already exist",
        }));
    }
    const insertResult = yield users_model_1.default.create(userCreateInput);
    const result = yield users_model_1.default.findById(insertResult._id.toHexString());
    if (!result) {
        // return res.status(500).json({
        //   message: "Problem getting created user from DB",
        // });
        return next(new exceptions_1.InternalErrorException({
            detail: "Problem getting created user from DB",
        }));
    }
    return res.status(201).json({
        user: result.username,
    });
});
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.default.find().exec();
    if (result.length > 0) {
        return res.status(200).json({
            user: result,
        });
    }
    return res.status(200);
});
const getByUsername = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const dataReceive = req.params;
    const pipeline = [];
    const match = {
        username: dataReceive.username,
    };
    pipeline.push({
        $match: match,
    });
    pipeline.push({
        $limit: 20,
    });
    const result = yield users_model_1.default.aggregate(pipeline).exec();
    console.log(result);
    if (result.length > 0) {
        return res.status(200).json({
            data: result,
        });
    }
    // return res.status(404).json({
    //   message: "user not found",
    // });
    return next(new exceptions_1.NotFoundException({
        detail: "user not found",
    }));
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
        yield users_model_1.default.findOneAndUpdate({ title: dataReceive.title }, dataToSave);
    }
    catch (error) {
        throw { status: 500, message: error.message };
    }
    res.status(200).json({
        data: {
            message: "update user success",
        },
    });
});
const remove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const dataReceive = req.body;
    try {
        yield users_model_1.default.findOneAndDelete({ title: dataReceive.title });
    }
    catch (error) {
        // throw { status: 500, message: error.message };
        next(new exceptions_1.HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "something went wrong"));
    }
    res.status(200).json({
        data: {
            message: "delete user success",
        },
    });
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const inputData = req.body;
    const pipeline = [];
    const match = {
        username: inputData.username,
        password: inputData.password,
    };
    pipeline.push({
        $match: match,
    });
    pipeline.push({
        $limit: 1,
    });
    const result = yield users_model_1.default.aggregate(pipeline).exec();
    console.log(result);
    if (result.length > 0) {
        return res.status(200).json({
            data: result,
            token: "this is token",
        });
    }
    // return res.status(404).json({
    //   message: "wrong username or password",
    // });
    return next(new exceptions_1.UnauthorizedErrorException({
        detail: "wrong username or password",
    }));
});
exports.default = { create, getAll, getByUsername, update, remove, login };
//# sourceMappingURL=users.controller.js.map
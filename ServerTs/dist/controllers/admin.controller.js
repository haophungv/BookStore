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
const admin_model_1 = require("../models/admin.model");
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const adminCreateInput = req.body;
    const insertResult = yield admin_model_1.default.create(adminCreateInput);
    const result = yield admin_model_1.default.findById(insertResult._id.toHexString());
    if (!result) {
        return res.status(500).json({
            message: "Problem getting created admin from DB",
        });
    }
    return res.status(201).json({
        admin: result.username,
    });
});
const getAll = (req, res, next) => {
    admin_model_1.default.find()
        .exec()
        .then((admin) => {
        return res.status(200).json({
            admin: admin,
            count: admin.length,
        });
    })
        .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error,
        });
    });
};
const getByUsername = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const dataReceive = req.params;
    const pipeline = [];
    const match = {
        category: dataReceive.username,
    };
    pipeline.push({
        $match: match,
    });
    pipeline.push({
        $limit: 20,
    });
    const result = yield admin_model_1.default.aggregate(pipeline).exec();
    console.log(result);
    if (result.length > 0) {
        return res.status(200).json({
            data: result,
        });
    }
    return res.status(404).json({
        message: "admin not found",
    });
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
        yield admin_model_1.default.findOneAndUpdate({ title: dataReceive.title }, dataToSave);
    }
    catch (error) {
        throw { status: 500, message: error.message };
    }
    res.status(200).json({
        data: {
            message: "update admin success",
        },
    });
});
const remove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const dataReceive = req.body;
    try {
        yield admin_model_1.default.findOneAndDelete({ title: dataReceive.title });
    }
    catch (error) {
        throw { status: 500, message: error.message };
    }
    res.status(200).json({
        data: {
            message: "delete admin success",
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
    const result = yield admin_model_1.default.aggregate(pipeline).exec();
    console.log(result);
    if (result.length > 0) {
        return res.status(200).json({
            data: result,
            token: "this is token",
        });
    }
    return res.status(404).json({
        message: "user not found",
    });
});
exports.default = { create, getAll, getByUsername, update, remove, login };
//# sourceMappingURL=admin.controller.js.map
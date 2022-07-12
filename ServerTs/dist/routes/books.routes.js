"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const express = require("express");
const books_controller_1 = require("../controllers/books.controller");
const router = express.Router();
exports.booksRouter = router;
router.post("/", books_controller_1.default.create);
router.get("/", books_controller_1.default.getAll);
router.get("/getByCategory/:category", books_controller_1.default.getByCategory);
router.get("/getById/:id", books_controller_1.default.getById);
router.put("/", books_controller_1.default.update);
router.delete("/", books_controller_1.default.remove);
//# sourceMappingURL=books.routes.js.map
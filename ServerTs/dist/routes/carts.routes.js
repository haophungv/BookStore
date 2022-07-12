"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartsRouter = void 0;
const express = require("express");
const carts_controller_1 = require("../controllers/carts.controller");
const router = express.Router();
exports.cartsRouter = router;
router.post("/", carts_controller_1.default.create);
//# sourceMappingURL=carts.routes.js.map
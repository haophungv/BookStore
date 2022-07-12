"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express = require("express");
const users_controller_1 = require("../controllers/users.controller");
// import UserController from '../controllers/index';
const router = express.Router();
exports.usersRouter = router;
router.post("/", users_controller_1.default.create);
router.get("/", users_controller_1.default.getAll);
router.get("/getByUsername/:username", users_controller_1.default.getByUsername);
router.put("/", users_controller_1.default.update);
router.delete("/", users_controller_1.default.remove);
router.post("/login", users_controller_1.default.login);
//# sourceMappingURL=users.routes.js.map
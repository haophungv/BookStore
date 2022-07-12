"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const router = express.Router();
exports.adminRouter = router;
router.post("/", admin_controller_1.default.create);
router.get("/", admin_controller_1.default.getAll);
router.get("/getByUsername/:Adminname", admin_controller_1.default.getByUsername);
router.put("/", admin_controller_1.default.update);
router.delete("/", admin_controller_1.default.remove);
router.post("/login", admin_controller_1.default.login);
//# sourceMappingURL=admin.routes.js.map
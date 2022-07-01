import * as express from "express";
import { Request, Response } from "express";
import UserController from "../controllers/users.controller";
const router = express.Router();

router.post("/", UserController.create);
router.get("/", UserController.getAll);
router.get("/getByUsername/:username", UserController.getByUsername);
router.put("/", UserController.update);
router.delete("/", UserController.remove);
router.post("/login", UserController.login);

// module.exports = router;
export { router as usersRouter };

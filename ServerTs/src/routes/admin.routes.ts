import * as express from "express";
import AdminController from "../controllers/admin.controller";
const router = express.Router();

router.post("/", AdminController.create);
router.get("/", AdminController.getAll);
router.get("/getByUsername/:Adminname", AdminController.getByUsername);
router.put("/", AdminController.update);
router.delete("/", AdminController.remove);

router.post("/login", AdminController.login);

// module.exports = router;
export { router as adminRouter };

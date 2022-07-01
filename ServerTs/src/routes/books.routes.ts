import * as express from "express";
import BookController from "../controllers/books.controller";
const router = express.Router();

router.post("/", BookController.create);
router.get("/", BookController.getAll);
router.get("/getByCategory/:category", BookController.getByCategory);
router.get("/getById/:id", BookController.getById);
router.put("/", BookController.update);
router.delete("/", BookController.remove);

// module.exports = router;
export { router as booksRouter };

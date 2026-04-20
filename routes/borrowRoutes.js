import express from "express";
import * as ctrl from "../controllers/borrowController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth(["user","admin"]), ctrl.borrowBook);
router.put("/:id", ctrl.returnBook);
router.get("/", auth(["user","admin"]), ctrl.borrowHistory);
router.get("/fines", auth(["admin"]), ctrl.getFineReport);
export default router;
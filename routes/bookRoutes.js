import express from "express";
import * as ctrl from "../controllers/bookController.js";
import upload from "../middleware/upload.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth(["admin"]), upload.single("image"), ctrl.addBook);
router.get("/", auth(), ctrl.getBooks);
router.get("/search", ctrl.searchBook);
router.get("/dashboard", auth(["admin"]), ctrl.dashboardStats);

export default router;
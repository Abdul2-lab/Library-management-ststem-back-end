import express from "express";
import * as ctrl from "../controllers/memberController.js";

const router = express.Router();

router.post("/", ctrl.addMember);
router.get("/", ctrl.getMembers);

export default router;
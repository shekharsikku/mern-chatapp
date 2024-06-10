import { Router } from "express";
import protectRoute from "../middleware/protect.route.js";
import { getAllUsers } from "../controllers/user.controller.js";

const router = Router();

router.get("/", protectRoute, getAllUsers);

export default router;
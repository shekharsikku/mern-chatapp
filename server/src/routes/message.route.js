import { Router } from "express";
import protectRoute from "../middleware/protect.route.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";

const router = Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
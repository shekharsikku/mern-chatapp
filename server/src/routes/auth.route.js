import { Router } from "express";
import { signup, signin, signout } from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.delete("/signout", signout);

export default router;
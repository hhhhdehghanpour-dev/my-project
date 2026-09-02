import { Router } from "express";
import { register } from "../controllers/register.controller";

const router = Router();

router.post("/users", register);

export default router;
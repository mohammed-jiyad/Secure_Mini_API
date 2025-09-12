import express from "express";
import { startAuth, authCallback } from "../controllers";

const router = express.Router();

router.get("/auth", startAuth);
router.get("/auth/callback", authCallback);

export default router;

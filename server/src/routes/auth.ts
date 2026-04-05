import express from "express";
import { getUserProfile, login, logout } from "../controllers/auth";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

// POST /api/auth/login
router.post("/login", login);

// POST /api/auth/profile
router.get("/profile", protect, getUserProfile);

// POST /api/auth/logout
router.post("/logout", logout);

export default router;

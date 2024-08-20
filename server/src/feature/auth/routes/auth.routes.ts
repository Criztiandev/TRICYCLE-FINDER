import express from "express";
import authController from "../controller/authController";

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.registration);

export default router;

import express from "express";
import userController from "../controller/user.controller";

const router = express.Router();
router.get("/transaction/all", userController.getAllTransactions);
export default router;

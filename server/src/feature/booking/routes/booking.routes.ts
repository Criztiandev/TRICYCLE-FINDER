import express from "express";
import bookingController from "../controller/booking.controller";

const router = express.Router();

router.get("/session", bookingController.getActiveSession);

export default router;

import express from "express";
import bookingRequestController from "../controller/booking-request.controller";

const router = express.Router();

router.post("/request", bookingRequestController.createBooking);
router.delete(
  "/request/cancel/:id",
  bookingRequestController.cancelBookingRequest
);

export default router;

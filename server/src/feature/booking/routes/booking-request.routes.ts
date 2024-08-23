import express from "express";
import bookingRequestController from "../controller/booking-request.controller";
import bookingController from "../controller/booking.controller";

const router = express.Router();

router.post("/create/:id", bookingRequestController.createBooking);
router.patch("/cancel/:id", bookingRequestController.cancelBooking);

router.get("/:id", bookingController.getBookingDetailsByRequestID);
router.patch(
  "/request/done/:id",
  bookingRequestController.completeBookingRequest
);

router.patch(
  "/request/accept/:id",
  bookingRequestController.acceptBookingRequest
);

export default router;

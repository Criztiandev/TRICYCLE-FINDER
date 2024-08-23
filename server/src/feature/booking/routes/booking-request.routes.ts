import express from "express";
import bookingRequestController from "../controller/booking-request.controller";
import bookingController from "../controller/booking.controller";

const router = express.Router();

router.post("/request", bookingRequestController.createBooking);
router.get("/request/:id", bookingController.getBookingDetailsByRequestID);
router.patch(
  "/request/done/:id",
  bookingRequestController.completeBookingRequest
);

router.patch(
  "/request/accept/:id",
  bookingRequestController.acceptBookingRequest
);
router.delete(
  "/request/cancel/:id",
  bookingRequestController.cancelBookingRequest
);

export default router;

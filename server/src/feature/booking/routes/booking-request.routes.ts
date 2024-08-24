import express from "express";
import bookingRequestController from "../controller/booking-request.controller";
import bookingController from "../controller/booking.controller";

const router = express.Router();

router.post("/create/:id", bookingRequestController.createBooking);
router.patch("/cancel/:id", bookingRequestController.cancelBooking);
router.patch("/accept/:id", bookingRequestController.acceptBooking);
router.patch("/done/:id", bookingRequestController.doneBooking);

router.get("/all", bookingRequestController.getAllRequest);
router.get("/user/details/:id", bookingRequestController.getUserRequest);

export default router;

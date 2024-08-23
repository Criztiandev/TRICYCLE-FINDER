import { Router } from "express";
import bookingRequestRoute from "./booking-request.routes";
import bookingRoutes from "./booking.routes";
import bookingRiderRoutes from "./booking.rider.routes";

const router = Router();

router.use("/booking", bookingRoutes);
router.use("/booking/rider", bookingRiderRoutes);
router.use("/booking/request", bookingRequestRoute);

export default router;

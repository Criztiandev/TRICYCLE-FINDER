import { Router } from "express";
import bookingRequestRoute from "./booking-request.routes";
const router = Router();

router.use("/booking", bookingRequestRoute);

export default router;

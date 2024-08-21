import { Router } from "express";
import bookingRequest from "./booking-request.routes";

const router = Router();
router.use("/booking", bookingRequest);

export default router;

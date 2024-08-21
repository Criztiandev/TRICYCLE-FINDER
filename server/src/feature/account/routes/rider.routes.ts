import express from "express";
import riderController from "../controller/rider.controller";

const router = express.Router();

router.get("/all", riderController.fetchAllRider);
router.get("/all/:status", riderController.fetchAllRiderByStatus);

export default router;

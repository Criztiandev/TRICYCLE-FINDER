import { Router } from "express";

import activityController from "../controller/activity.controller";
const router = Router();

router.get("/all", activityController.fetchAllActivity);
router.get("/:id", activityController.fetchActivityById);
router.get("/:id/all", activityController.fetchActivityById);

router.post("/create", activityController.createActivity);
router.put("/:id", activityController.updateActivity);
router.delete("/:id", activityController.deleteActivity);

export default router;

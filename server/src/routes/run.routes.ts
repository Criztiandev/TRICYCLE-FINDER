import { Router } from "express";
import runController from "../controller/run.controller";

const router = Router();

router.get("/all", runController.fetchAllRun);
router.get("/:id", runController.fetchRunById);
router.get("/:id/all", runController.fetchRunById);

router.post("/create", runController.createRun);
router.put("/:id", runController.updateRun);
router.delete("/:id", runController.deleteRun);

export default router;

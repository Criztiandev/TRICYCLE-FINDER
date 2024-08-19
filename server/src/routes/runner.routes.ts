import { Router } from "express";

import runnerController from "../controller/runner.controller";
const router = Router();

router.get("/all", runnerController.fetchAllRunner);
router.get("/:id", runnerController.fetchRunnerById);
router.get("/:id/all", runnerController.fetchRunnerById);

router.post("/create", runnerController.createRunner);
router.put("/:id", runnerController.updateRunner);
router.delete("/:id", runnerController.deleteRunner);

export default router;

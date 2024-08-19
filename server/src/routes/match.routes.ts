import { Router } from "express";
import matchController from "../controller/match.controller";

const router = Router();

router.get("/all", matchController.fetchAllMatch);
router.get("/:id", matchController.fetchMatchById);
router.get("/:id/all", matchController.fetchMatchById);

router.post("/create", matchController.createMatch);
router.put("/:id", matchController.updateMatch);
router.delete("/:id", matchController.deleteMatch);

export default router;

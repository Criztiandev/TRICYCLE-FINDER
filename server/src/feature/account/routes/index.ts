import { Router } from "express";
import accountRoutes from "./account.routes";
import riderRoutes from "./rider.routes";

const router = Router();
router.use("/account", accountRoutes);
router.use("/rider", riderRoutes);
export default router;

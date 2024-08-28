import { Router } from "express";
import accountRoutes from "./account.routes";
import riderRoutes from "./rider.routes";
import userRoutes from "./user.routes";



const router = Router();
router.use("/account", accountRoutes);
router.use("/rider", riderRoutes);
router.use("/user",userRoutes)
export default router;

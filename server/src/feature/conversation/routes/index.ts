import { Router } from "express";
import conversationRoutes from "./conversation.routes"; // Adjust the path based on your directory structure

const router = Router();

router.use("/conversation", conversationRoutes);

// Add other routes here

export default router;

import { Router } from "express";
import conversationController from "../controller/conversation.controller";
import messageController from "../controller/message.controller";

const router = Router();

router.get("/all", conversationController.fetchAllConversation);
router.get("/:id", conversationController.fetchConversationById);
router.get("/user/all", conversationController.fetchAllUserConversation);

router.post("/message/:id", messageController.sendMessage);

router.post("/create", conversationController.createConversation);
router.delete("/:id", conversationController.deleteConversation);

export default router;

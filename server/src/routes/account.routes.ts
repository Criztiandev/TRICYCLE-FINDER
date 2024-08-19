import { Router } from "express";
import accountController from "../controller/account.controller";

const router = Router();

router.get("/profile", accountController.profileDetails);
router.get("/:id", accountController.fetchAccountByIdWithFriendRequest);

router.post("/search", accountController.fetchAccountsBySearch);
router.delete("/logout", accountController.logout);

// Mount friend routes under /account/friend

export default router;

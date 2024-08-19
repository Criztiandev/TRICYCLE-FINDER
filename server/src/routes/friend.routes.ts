import { Router } from "express";
import friendController from "../controller/friend.controller";
import friendRequestController from "../controller/friendRequest.controller";

const router = Router();

router.get("/details/:id", friendController.fetchFriendById);

router.get("/list", friendController.fetchAllFriendsList);

router.get("/request", friendController.fetchAllFriendRequest);

router.get("/sent-request", friendController.fetchAllSentFriendRequest);
router.get(
  "/sent-request/:id",
  friendRequestController.fetchSentFriendRequestByID
);

router.patch(
  "/request/accept/:id",
  friendRequestController.acceptFriendRequest
);
router.patch(
  "/request/reject/:id",
  friendRequestController.cancelFriendRequest
);

router.patch(
  "/request/cancel/:id",
  friendRequestController.cancelFriendRequest
);

router.post("/search", friendController.fetchFriendBySearch);
router.patch("/add/:id", friendController.AddFriend);
router.delete("/remove/:id", friendController.removeFriend);

export default router;

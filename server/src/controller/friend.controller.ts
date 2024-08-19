import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import accountModel from "../model/account.model";
import friendRequestModel from "../model/friendRequestModel";

class FriendController {
  constructor() {}

  public fetchAllFriendsList = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { UID } = req.user;

      console.log(UID);

      const credentials = await accountModel
        .findById(UID)
        .select("followers")
        .populate("followers", "firstName lastName")
        .lean();

      if (!credentials) throw new Error("User doesn't exist");
      res.status(200).json({
        payload: credentials,
        message: "Fetched successfully",
      });
    }
  );

  public fetchAllFriendRequest = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { UID } = req.user;

      // check if the friend request is already resolve
      const friendRequest = await friendRequestModel
        .find({ recipient: UID })
        .select("sender")
        .populate({
          path: "sender",
          select: "firstName lastName userName",
        })
        .lean();

      if (!friendRequest) throw new Error("Request doesnt exist");

      res.status(200).json({
        payload: friendRequest,
        message: "Fetched successfully",
      });
    }
  );

  public fetchAllSentFriendRequest = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { UID } = req.user;

      // check if the friend request is already resolve
      const friendRequest = await friendRequestModel
        .find({ sender: UID })
        .select("recipient")
        .populate({
          path: "recipient",
          select: "firstName lastName userName",
        })
        .lean();

      if (!friendRequest) throw new Error("Request doesnt exist");

      res.status(200).json({
        payload: friendRequest,
        message: "Fetched successfully",
      });
    }
  );

  public fetchFriendById = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { id: targetID } = req.params;
      const { UID } = req.user as { UID: string };

      // Fetch the current user's account
      const currentUser = await accountModel.findById(UID).lean();
      if (!currentUser) throw new Error("Account doesnt exist");

      const { followers, following } = currentUser;

      // Check if the provided ID is in followers or following
      const isFollowerOrFollowing =
        followers?.some((followersID) => followersID.toString() === targetID) ||
        following?.some((followingID) => followingID.toString() === targetID);

      if (!isFollowerOrFollowing)
        throw new Error("Account not found in your connections tang ina");

      const friend = await accountModel.findById(targetID).lean();
      if (!friend) throw new Error("Account is not a friend");

      res.status(200).json({
        payload: friend,
        message: "Friend fetched successfully",
      });
    }
  );

  public fetchFriendBySearch = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { filter } = req.body;
      const { UID } = req.user as { UID: string };

      if (!filter) throw new Error("Search filter is required");

      const currentUser = await accountModel.findById(UID).lean();
      if (!currentUser) throw new Error("Account doesnt exist");

      const details = await accountModel
        .find({
          $and: [
            { _id: { $in: currentUser.followers } },
            { _id: { $in: currentUser.following } },
            {
              $or: [
                { firstName: { $regex: filter, $options: "i" } },
                { lastName: { $regex: filter, $options: "i" } },
                { userName: { $regex: filter, $options: "i" } },
              ],
            },
          ],
        })
        .lean();

      res.status(200).json({
        payload: details,
        message: "Friends fetched successfully",
      });
    }
  );

  public AddFriend = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id: targetID } = req.params;
      const { UID } = req.user as { UID: string };

      if (UID === targetID) throw new Error("Wtf are you doing ?");

      // Fetch the current user's account
      const currentUser = await accountModel.findById(UID).lean();
      if (!currentUser) throw new Error("Account doesnt exist");

      const { followers, following } = currentUser;

      // Check if the provided ID is in followers or following
      const isFollowerOrFollowing =
        followers?.some((followersID) => followersID.toString() === targetID) ||
        following?.some((followingID) => followingID.toString() === targetID);

      if (isFollowerOrFollowing)
        throw new Error("Account is already your friend");

      // check if the friend request is already exist
      const isAlreadyFriendRequest = await friendRequestModel.findOne({
        $and: [{ sender: UID }, { recipient: targetID }],
      });

      if (isAlreadyFriendRequest)
        throw new Error("Friend Request is already sent");

      const friendRequest = await friendRequestModel.create({
        sender: UID,
        recipient: targetID,
      });

      if (!friendRequest) throw new Error("Something went wrong");

      res.status(200).json({
        payload: friendRequest.id,
        message: "Friend request sent",
      });
    }
  );

  public removeFriend = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id: targetID } = req.params;
      const { UID } = req.user as { UID: string };

      if (UID === targetID) throw new Error("Wtf are you doing ?");

      // Fetch the current user's account
      const currentUser = await accountModel.findById(UID).lean();
      if (!currentUser) throw new Error("Account doesnt exist");

      const { followers, following } = currentUser;

      // Check if the provided ID is in followers or following
      const isFollowerOrFollowing =
        followers?.some((followersID) => followersID.toString() === targetID) ||
        following?.some((followingID) => followingID.toString() === targetID);

      if (!isFollowerOrFollowing) throw new Error("Account is not your friend");

      // remove them as in their followers and following list both account
      const updatedTargetAccount = await accountModel.findByIdAndUpdate(
        targetID,
        {
          $pull: { followers: UID, following: UID },
        }
      );

      if (!updatedTargetAccount) throw new Error("Something went wrong");

      // remove them as in their followers and following list both account
      const updateCurrentAccount = await accountModel.findByIdAndUpdate(
        targetID,
        {
          $pull: { followers: targetID, following: targetID },
        }
      );

      if (!updateCurrentAccount) throw new Error("Something went wrong");

      res.status(200).json({
        payload: targetID,
        message: "Updated Successfully",
      });
    }
  );
}
export default new FriendController();

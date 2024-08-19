import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import runnerModel from "../model/runner.model";
import accountModel from "../model/account.model";
import mongoose, { ObjectId } from "mongoose";
import friendRequestModel from "../model/friendRequestModel";

class FriendRequestController {
  constructor() {}

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

  public fetchSentFriendRequestByID = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      // check if the friend request is already resolve
      const friendRequest = await friendRequestModel
        .findOne({ sender: id })
        .select("recipient")
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

  public acceptFriendRequest = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id: requestID } = req.params;
      const { UID } = req.user;

      // check if the friend request is already resolve
      const friendRequest = await friendRequestModel
        .findOne({
          $and: [{ _id: requestID }, { recipient: UID }],
        })
        .select("sender")
        .populate({
          path: "sender",
          select: "_id",
        })
        .populate({
          path: "recipient",
          select: "followers following",
        })
        .lean();

      if (!friendRequest) {
        throw new Error("You are not allowed to perform this action");
      }

      const { sender, recipient } = friendRequest;

      const { _id: senderID } = sender;
      const { followers, following } = recipient as any;

      if (senderID === UID) throw new Error("Invalid Action");

      // Check if the provided ID is in followers or following
      const isFollowerOrFollowing =
        followers?.some(
          (followersID: ObjectId) =>
            followersID.toString() === senderID.toString()
        ) ||
        following?.some(
          (followingID: ObjectId) =>
            followingID.toString() === senderID.toString()
        );

      if (isFollowerOrFollowing) {
        await friendRequestModel.findByIdAndDelete(requestID);
        throw new Error("Account is already your mutual connection");
      }

      // Inject the providedID to the followers and following
      const updatedAccount = await accountModel.findByIdAndUpdate(
        UID,
        {
          $push: { followers: senderID, following: senderID },
        },
        { new: true }
      );

      if (!updatedAccount) throw new Error("Update Failed");

      const recipientAccount = await accountModel.findByIdAndUpdate(
        senderID,
        { $push: { followers: UID, following: UID } },
        { new: true }
      );

      if (!recipientAccount) throw new Error("Recipient Updated Failed");

      // delete the friend request
      await friendRequestModel.findByIdAndDelete(requestID);

      res.status(200).json({
        payload: updatedAccount._id,
        message: "Accepted successfully",
      });
    }
  );

  public cancelFriendRequest = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { UID } = req.user;

      // check if the friend request is already resolve
      const friendRequest = await friendRequestModel
        .findOne({
          $and: [{ sender: UID }],
        })
        .lean();

      if (!friendRequest) {
        throw new Error("Friend Request doesnt exist");
      }

      const deleteRequest = await friendRequestModel.findOneAndDelete({
        $and: [{ sender: UID }],
      });
      if (!deleteRequest) throw new Error("Cancel Request Failed");

      res.status(200).json({
        payload: deleteRequest._id,
        message: "Rejected successfully",
      });
    }
  );
}
export default new FriendRequestController();

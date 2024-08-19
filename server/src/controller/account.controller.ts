import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import runnerModel from "../model/runner.model";
import accountModel from "../model/account.model";
import {
  AccountSchemaValue,
  AccountWithPreferenceValue,
} from "../interface/account.interface";
import friendRequestModel from "../model/friendRequestModel";
import { ObjectId } from "mongoose";

class AccountController {
  profileDetails = expressAsyncHandler(async (req: Request, res: Response) => {
    const { UID } = req.user;

    const runner = await runnerModel
      .findOne<AccountWithPreferenceValue>({ accountID: UID })
      .lean()
      .populate({
        path: "accountID",
        select: "-following -password -__v -_id",
      })
      .select("-__v -_id");

    if (!runner) {
      throw new Error("Account doesn't exist");
    }

    const { accountID, ...runnerDetails } = runner;
    const populatedAccountID = accountID as unknown as AccountSchemaValue; // Type assertion

    res.status(200).json({
      payload: {
        ...populatedAccountID,
        ...runnerDetails,
        followersCount: populatedAccountID.followers?.length,
      },
      message: "Fetched Successfully",
    });
  });

  fetchAccountById = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { id: UID } = req.params;

      console.log("HI");

      const runner = await runnerModel
        .findOne<AccountWithPreferenceValue>({ accountID: UID })
        .lean()
        .populate({
          path: "accountID",
          select: "-following -password -__v",
        })
        .select("-__v -_id");

      if (!runner) {
        throw new Error("Account doesn't exist");
      }

      const { accountID, ...runnerDetails } = runner;
      const populatedAccountID = accountID as unknown as AccountSchemaValue; // Type assertion

      res.status(200).json({
        payload: {
          ...populatedAccountID,
          ...runnerDetails,
          followersCount: populatedAccountID.followers?.length,
        },
        message: "Fetched Successfully",
      });
    }
  );

  fetchAccountByIdWithFriendRequest = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { id: targetID } = req.params;
      const { UID: currentID } = req.user;

      const runner = await runnerModel
        .findOne<AccountWithPreferenceValue>({ accountID: targetID })
        .lean()
        .populate({
          path: "accountID",
          select: "-password -__v",
        })
        .select("-__v -_id");

      if (!runner) {
        throw new Error("Account doesn't exist");
      }

      const { accountID, ...runnerDetails } = runner;
      const populatedAccountID = accountID as unknown as AccountSchemaValue; // Type assertion
      const { followers, following } = accountID as any;

      const friendRequest = await friendRequestModel
        .findOne({ recipient: accountID })
        .lean();

      const isFollower = followers?.some(
        (followerId: ObjectId) => followerId.toString() === currentID
      );
      const isFollowing = following?.some(
        (followingId: ObjectId) => followingId.toString() === currentID
      );

      const status = this.getFriendshipStatus(
        friendRequest,
        isFollowing,
        isFollower
      );

      res.status(200).json({
        payload: {
          ...populatedAccountID,
          ...runnerDetails,
          followersCount: populatedAccountID.followers?.length,
          status: status,
        },
        message: "Fetched Successfully",
      });
    }
  );

  public fetchAccountsBySearch = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { filter } = req.body;

      if (!filter) throw new Error("Search filter is required");

      const accounts = await accountModel.aggregate([
        {
          $addFields: {
            fullName: { $concat: ["$firstName", " ", "$lastName"] },
          },
        },
        {
          $match: {
            $or: [
              { firstName: { $regex: filter, $options: "i" } },
              { lastName: { $regex: filter, $options: "i" } },
              { userName: { $regex: filter, $options: "i" } },
              { fullName: { $regex: filter, $options: "i" } },
            ],
          },
        },
      ]);

      res.status(200).json({
        payload: accounts,
        message: "Accounts fetched successfully",
      });
    }
  );

  logout = expressAsyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({
      payload: null,
      message: "Logout successful",
    });
  });

  getFriendshipStatus = (
    friendRequest: any,
    isFollower: boolean,
    isFollowing: boolean
  ): string => {
    if (friendRequest) return "pending";
    if (isFollower || isFollowing) return "friend";
    return "not_friend";
  };
}

export default new AccountController();

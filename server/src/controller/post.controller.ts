import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { postModel } from "../model/posts.model";
import mongoose, { ObjectId } from "mongoose";
import accountModel from "../model/account.model";
import { PostValue, PostWithAccount } from "../interface/post.interface";
import { AccountSchemaValue } from "../interface/account.interface";

class PostController {
  constructor() {}

  fetchAllPost = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { UID } = req.user;

      console.log(UID);

      const credentials = await postModel
        .find()
        .populate({
          path: "accountID",
          select: "firstName lastName location",
        })
        .lean();

      const formattedPost = credentials.map((post) => {
        const likedCount = post.liked.length;
        const isLiked = post.liked.some((id) => id.toString() === UID);

        const { accountID: details, ...rest } = post;
        return {
          details,
          ...rest,
          likedCount,
          isLiked,
        };
      });

      res.status(200).json({
        payload: formattedPost.reverse(),
        message: "Fetched successfully",
      });
    }
  );

  fetchPostById = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const { UID } = req.user;

      const credentials = await postModel
        .findOne({ _id: id })
        .populate({
          path: "accountID",
          select: "firstName lastName location",
        })
        .lean();

      if (!credentials) throw new Error("Post doest exist");

      const likeCount = credentials.liked.length;
      const isLiked = credentials.liked.some((id) => id.toString() === UID);

      const { accountID: details, ...rest } = credentials;

      delete (rest as any).liked;

      res.status(200).json({
        payload: {
          details,
          likeCount,
          isLiked,
          ...rest,
        },
        message: "Fetched successfully",
      });
    }
  );

  createPost = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { UID } = req.user;

      const credentials = await postModel.create({
        accountID: UID,
        ...req.body,
      });

      if (!credentials)
        throw new Error("Failed to create credentials, Please try again later");

      res.status(200).json({
        payload: credentials,
        message: "Created successfully",
      });
    }
  );

  updatePost = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const { UID } = req.user;

      // Check if post exists
      await this.getPostCredentials(id);

      const updatedCredentials = await postModel
        .updateOne({ $and: [{ _id: id }, { accountID: UID }] }, req.body)
        .lean();

      if (!updatedCredentials.acknowledged)
        throw new Error("Update Failed, Please try again later");

      res.status(200).json({
        payload: id,
        message: "Updated successfully",
      });
    }
  );

  deletePost = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const { UID } = req.user;

      // Check if post exists
      await this.getPostCredentials(id);

      const result = await postModel.deleteOne({
        $and: [{ _id: id }, { accountID: UID }],
      });

      if (!result) throw new Error("Delete failed");

      res.status(200).json({
        payload: id,
        message: "Deleted successfully",
      });
    }
  );

  likePost = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { id } = req.params;
      const { UID } = req.user;

      const postCredentials = await postModel.findOne({ _id: id }).lean();
      if (!postCredentials) throw new Error("Post does'nt exist");

      let likersList = postCredentials.liked || [];
      let message = "";

      const isLiked = likersList.some((id) => id.toString() === UID);

      if (isLiked) {
        likersList = likersList.filter((id) => id.toString() !== UID);
        message = "Unliked successfully";
      } else {
        likersList = [...likersList, UID];
        message = "Liked successfully";
      }

      // update the post
      const updatedPost = await postModel.findByIdAndUpdate(
        id,
        { liked: likersList },
        { new: true }
      );

      if (!updatedPost) throw new Error("Updated failed, Please try again");

      res.status(200).json({
        payload: id,
        message,
      });
    }
  );

  /**
   * This is a helper function that lets you get the runner's credentials
   * @param runnerID The key id of the runner account
   * @param select The selection of the fields that you want
   * @returns the credentials of the model finds
   */
  private async getAccountCredentials(
    runnerID: ObjectId | string,
    select: string = "_id"
  ) {
    const credentials = await accountModel
      .findById(runnerID)
      .lean()
      .select(select);

    if (!credentials) {
      throw new Error("Runner doesnt exist");
    }
    return credentials;
  }

  /**
   * This is a helper function that lets you get the runner's credentials
   * @param postID The key id of the runner account
   * @param select The selection of the fields that you want
   * @returns the credentials of the model finds
   */
  private async getPostCredentials(postID: ObjectId | string, select?: string) {
    const credentials = await postModel
      .findById(postID)
      .lean()
      .select(select || "");

    if (!credentials) {
      throw new Error("Post doesnt exist");
    }
    return credentials;
  }
}

export default new PostController();

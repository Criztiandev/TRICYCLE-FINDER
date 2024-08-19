import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import runnerModel from "../model/runner.model";
import accountModel from "../model/account.model";
import mongoose, { ObjectId } from "mongoose";

class RunnerController {
  constructor() {}

  public fetchAllRunner = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const credentials = await runnerModel.find().lean();

      res.status(200).json({
        payload: credentials,
        message: "Fetched successfully",
      });
    }
  );

  public fetchRunnerById = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      const runnerCredentials = await runnerModel
        .findOne({ _id: id })
        .populate("accountID", "-password")
        .lean();

      if (!runnerCredentials) throw new Error("Runner doesnt exist");

      res.status(200).json({
        payload: runnerCredentials,
        message: "Fetched successfully",
      });
    }
  );

  public createRunner = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { runnerID } = req.body;

      // check if the runner exist
      await this.getRunnerCredentials(runnerID);

      const credentials = await runnerModel.create({
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

  public updateRunner = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      // check if the runner exist
      await this.getRunnerCredentials(id);

      const updatedCredentials = await runnerModel
        .updateOne({ _id: id }, req.body)
        .lean();

      if (!updatedCredentials.acknowledged)
        throw new Error("Update Failed, Please try again later");

      res.status(200).json({
        payload: id,
        message: "Updated successfully",
      });
    }
  );

  public deleteRunner = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      // check if the runner exist
      const { accountID } = await this.getRunnerCredentials(id, "accountID");

      try {
        const deletedRunner = await runnerModel.findByIdAndDelete(id);
        if (!deletedRunner) throw new Error("Failed to delete runner");
        const deletedAccount = await accountModel.findByIdAndDelete(accountID);
        if (!deletedAccount)
          throw new Error("Failed to delete associated account");
      } catch (error: any) {
        throw new Error(error);
      }

      res.status(200).json({
        payload: id,
        message: "Deleted successfully",
      });
    }
  );

  /**
   * This is a helper function that lets you get the runner's credentials
   * @param runnerID The key id of the runner account
   * @param select The selection of the fields that you want
   * @returns the credentials of the model finds
   */
  private async getRunnerCredentials(
    runnerID: ObjectId | string,
    select: string = "_id"
  ) {
    const credentials = await runnerModel
      .findById(runnerID)
      .lean()
      .select(select);

    if (!credentials) {
      throw new Error("Runner doesnt exist");
    }
    return credentials;
  }
}
export default new RunnerController();

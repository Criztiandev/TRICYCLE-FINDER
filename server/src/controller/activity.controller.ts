import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { activityModel } from "../model/activity.model";

class ActivityController {
  constructor() {}

  fetchAllActivity = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const credentials = await activityModel.find().lean();

      // make this paginaed

      res.status(200).json({
        payload: credentials,
        message: "Fetched successfully",
      });
    }
  );

  fetchAllActivityActivity = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { id } = req.params;

      // check if activity exist
      const activityCredentials = await activityModel
        .findById(id)
        .lean()
        .select("_id");

      if (!activityCredentials) throw new Error("Activity doesnt exist");

      const credentials = await activityModel.find({ activityID: id }).lean();

      res.status(200).json({
        payload: credentials,
        message: "Fetched successfully",
      });
    }
  );

  fetchActivityById = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      const activityCredentials = await activityModel
        .findOne({ _id: id })
        .lean()
        .select("_id");

      if (!activityCredentials) throw new Error("Activity doesnt exist");

      const credentials = await activityModel
        .findOne({ activityID: id })
        .lean();
      if (!credentials) throw new Error("Activity doest exist");

      res.status(200).json({
        payload: credentials,
        message: "Fetched successfully",
      });
    }
  );

  createActivity = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { activityID } = req.body;

      const activityCredentials = await activityModel
        .findById(activityID)
        .lean()
        .select("_id");
      if (!activityCredentials) throw new Error("Activity doesnt exist");

      // check if challege exist

      const credentials = await activityModel.create({
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

  updateActivity = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const { activityID } = req.body;

      const activityCredentials = await activityModel
        .findById(activityID)
        .lean()
        .select("_id");
      if (!activityCredentials) throw new Error("Activity doesnt exist");

      const updatedCredentials = await activityModel
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

  deleteActivity = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      // Check if activity exists
      const activity = await activityModel.findById(id).lean().select("_id");
      if (!activity) throw new Error("Activity doest exist");

      const result = await activityModel.deleteOne({ _id: id });
      if (!result) throw new Error("Delete failed");

      res.status(200).json({
        payload: id,
        message: "Deleted successfully",
      });
    }
  );
}

export default new ActivityController();

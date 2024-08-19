import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import runModel from "../model/run.model";

class RunController {
  constructor() {}

  fetchAllRun = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const credentials = await runModel.find().lean();

      // make this paginaed

      res.status(200).json({
        payload: credentials,
        message: "Fetched successfully",
      });
    }
  );

  fetchAllRunRun = expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // check if run exist
    const runCredentials = await runModel.findById(id).lean().select("_id");

    if (!runCredentials) throw new Error("Run doesnt exist");

    const credentials = await runModel.find({ runID: id }).lean();

    res.status(200).json({
      payload: credentials,
      message: "Fetched successfully",
    });
  });

  fetchRunById = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      const runCredentials = await runModel
        .findOne({ _id: id })
        .lean()
        .select("_id");

      if (!runCredentials) throw new Error("Run doesnt exist");

      const credentials = await runModel.findOne({ runID: id }).lean();
      if (!credentials) throw new Error("Run doest exist");

      res.status(200).json({
        payload: credentials,
        message: "Fetched successfully",
      });
    }
  );

  createRun = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { runID } = req.body;

      const runCredentials = await runModel
        .findById(runID)
        .lean()
        .select("_id");
      if (!runCredentials) throw new Error("Run doesnt exist");

      // check if challege exist

      const credentials = await runModel.create({
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

  updateRun = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const { runID } = req.body;

      const runCredentials = await runModel
        .findById(runID)
        .lean()
        .select("_id");
      if (!runCredentials) throw new Error("Run doesnt exist");

      const updatedCredentials = await runModel
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

  deleteRun = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      // Check if run exists
      const run = await runModel.findById(id).lean().select("_id");
      if (!run) throw new Error("Run doest exist");

      const result = await runModel.deleteOne({ _id: id });
      if (!result) throw new Error("Delete failed");

      res.status(200).json({
        payload: id,
        message: "Deleted successfully",
      });
    }
  );
}

export default new RunController();

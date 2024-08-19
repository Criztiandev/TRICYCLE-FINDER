import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import matchModel from "../model/match.model";

class MatchController {
  constructor() {}

  fetchAllMatch = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const credentials = await matchModel.find().lean();

      // make this paginaed

      res.status(200).json({
        payload: credentials,
        message: "Fetched successfully",
      });
    }
  );

  fetchAllMatchMatch = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { id } = req.params;

      // check if match exist
      const matchCredentials = await matchModel
        .findById(id)
        .lean()
        .select("_id");

      if (!matchCredentials) throw new Error("Match doesnt exist");

      const credentials = await matchModel.find({ matchID: id }).lean();

      res.status(200).json({
        payload: credentials,
        message: "Fetched successfully",
      });
    }
  );

  fetchMatchById = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      const matchCredentials = await matchModel
        .findOne({ _id: id })
        .lean()
        .select("_id");

      if (!matchCredentials) throw new Error("Match doesnt exist");

      const credentials = await matchModel.findOne({ matchID: id }).lean();
      if (!credentials) throw new Error("Match doest exist");

      res.status(200).json({
        payload: credentials,
        message: "Fetched successfully",
      });
    }
  );

  createMatch = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { matchID } = req.body;

      const matchCredentials = await matchModel
        .findById(matchID)
        .lean()
        .select("_id");
      if (!matchCredentials) throw new Error("Match doesnt exist");

      // check if challege exist

      const credentials = await matchModel.create({
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

  updateMatch = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const { matchID } = req.body;

      const matchCredentials = await matchModel
        .findById(matchID)
        .lean()
        .select("_id");
      if (!matchCredentials) throw new Error("Match doesnt exist");

      const updatedCredentials = await matchModel
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

  deleteMatch = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      // Check if match exists
      const match = await matchModel.findById(id).lean().select("_id");
      if (!match) throw new Error("Match doest exist");

      const result = await matchModel.deleteOne({ _id: id });
      if (!result) throw new Error("Delete failed");

      res.status(200).json({
        payload: id,
        message: "Deleted successfully",
      });
    }
  );
}

export default new MatchController();

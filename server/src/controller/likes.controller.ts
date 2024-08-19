import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

class LikesController {
  constructor() {}

  fetchAllLikes = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {}
  );

  fetchAllRunnerLikes = expressAsyncHandler(
    async (req: Request, res: Response) => {}
  );

  fetchLikesById = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {}
  );

  updateLikes = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {}
  );

  deleteLikes = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {}
  );
}

export default new LikesController();

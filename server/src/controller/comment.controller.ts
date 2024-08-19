import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

class CommentController {
  constructor() {}

  fetchAllComment = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {}
  );

  fetchAllRunnerComment = expressAsyncHandler(
    async (req: Request, res: Response) => {}
  );

  fetchCommentById = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {}
  );

  updateComment = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {}
  );

  deleteComment = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {}
  );
}

export default new CommentController();

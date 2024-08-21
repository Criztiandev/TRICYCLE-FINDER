import { NextFunction, Request, Response } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = res.statusCode === 200 ? 400 : res.statusCode;
  let message = err.message;

  // If Mongoose not found error, set to 404 and change message
  if (err.name === "CastError" && (err as any).kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    error: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

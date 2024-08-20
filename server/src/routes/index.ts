import express, { Express } from "express";
import accountRoutes from "./account.routes";

import authRoutes from "../feature/auth/routes";
import conversationRoutes from "../feature/conversation/routes";

import protectedMiddleware from "../middleware/protected.middleware";
const { protectedRoute } = protectedMiddleware;

const Routes = (app: Express) => {
  app.use("/api", authRoutes);

  // Private
  app.use("/api/", [protectedRoute], conversationRoutes);
};

export default Routes;

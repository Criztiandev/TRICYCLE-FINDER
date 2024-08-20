import express, { Express } from "express";

import authRoutes from "../feature/auth/routes";
import conversationRoutes from "../feature/conversation/routes";
import accountRoutes from "../feature/account/routes";
import protectedMiddleware from "../middleware/protected.middleware";

const { protectedRoute } = protectedMiddleware;

const Routes = (app: Express) => {
  app.use("/api", authRoutes);
  app.use("/api", accountRoutes);

  // Private routes
  app.use("/api/", [protectedRoute], conversationRoutes);
};

export default Routes;

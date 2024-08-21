import express, { Express } from "express";

import authRoutes from "../feature/auth/routes";
import conversationRoutes from "../feature/conversation/routes";
import accountRoutes from "../feature/account/routes";
import protectedMiddleware from "../middleware/protected.middleware";
import bookingRequest from "../feature/booking/routes";

const { protectedRoute } = protectedMiddleware;

const Routes = (app: Express) => {
  app.use("/api", authRoutes);

  // Private routes
  app.use("/api/", [protectedRoute], conversationRoutes);
  app.use("/api", [protectedRoute], accountRoutes);
  app.use("/api", [protectedRoute], bookingRequest);
};

export default Routes;

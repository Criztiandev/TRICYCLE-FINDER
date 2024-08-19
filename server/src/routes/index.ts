import express, { Express } from "express";
import authRoutes from "./auth.routes";
import accountRoutes from "./account.routes";
import activityRoutes from "./activity.routes";
import matchRoutes from "./match.routes";
import runnerRoutes from "./runner.routes";
import runRoutes from "./run.routes";
import postRoutes from "./post.routes";
import conversationRoutes from "../feature/conversation/routes";

import protectedMiddleware from "../middleware/protected.middleware";
import friendRoutes from "./friend.routes";
const { protectedRoute } = protectedMiddleware;

const Routes = (app: Express) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/match", matchRoutes);
  app.use("/api/runner", [protectedRoute], runnerRoutes);
  app.use("/api/run", runRoutes);

  // Social media routes
  app.use("/api/post", [protectedRoute], postRoutes);
  app.use("/api/activity", [protectedRoute], activityRoutes);

  // message
  app.use("/api/", [protectedRoute], conversationRoutes);

  //Account
  app.use("/api/account", [protectedRoute], accountRoutes);
  app.use("/api/friend", [protectedRoute], friendRoutes);
};

export default Routes;

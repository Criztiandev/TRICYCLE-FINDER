import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import tokenUtils from "../utils/token.utils";
import accountModel from "../feature/account/model/account.model";

class ProtectedMiddleware {
  protectedRoute = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      try {
        const authHeader = req.headers["authorization"];
        const accessToken = authHeader && authHeader.split(" ")[1];

        if (!accessToken) {
          return res.status(401).json({ error: "Access token is missing" });
        }

        let decodedToken = tokenUtils.verifyToken(accessToken);

        if (decodedToken.expired) {
          const refreshToken = req.headers["x-refresh-token"] as string;

          if (!refreshToken) {
            return res.status(401).json({ error: "Refresh token is missing" });
          }

          const refreshDecodedToken = tokenUtils.verifyToken(refreshToken);

          if (refreshDecodedToken.expired) {
            throw new Error("Refresh token expired");
          }

          const newAccessToken = tokenUtils.generateToken<any>(
            refreshDecodedToken.payload,
            process.env.ACCESS_TOKEN_EXPIRATION
          );

          res.setHeader("X-New-Access-Token", newAccessToken);

          decodedToken = {
            payload: refreshDecodedToken.payload,
            expired: false,
          };
        }

        const credentials = await accountModel
          .findById(decodedToken.payload.UID)
          .lean()
          .select("_id role");

        if (!credentials) {
          throw new Error("User not found");
        }

        const userData = {
          ...decodedToken.payload,
          role: credentials?.role || "user",
          verified: true,
        };

        // Attach user data to req object
        (req as any).user = userData;

        next();
      } catch (error) {
        console.error("Protected route error:", error);
        if (error instanceof Error) {
          return res.status(401).json({ message: error.message });
        }
        return res.status(401).json({ message: "Authentication failed" });
      }
    }
  );
}

export default new ProtectedMiddleware();

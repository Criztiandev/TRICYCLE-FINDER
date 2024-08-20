import expressAsyncHandler from "express-async-handler";
import AuthService from "../services/auth.service";
import { NextFunction, Request, Response } from "express";

class AuthController {
  private service: AuthService;
  constructor() {
    this.service = new AuthService();
  }

  public registration = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await this.service.registerUser(req.body);

      res.status(200).json({
        payload: result,
        message: "Register account successfully",
      });
    }
  );

  public login = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;
      const result = await this.service.loginUser(email, password);

      res.status(200).json({
        payload: result,
        message: "Register account successfully",
      });
    }
  );
}

export default new AuthController();

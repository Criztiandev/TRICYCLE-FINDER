import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import AccountService from "../services/account.service";

class AccountController {
  private service: AccountService;
  constructor() {
    this.service = new AccountService();
  }
  profileDetails = expressAsyncHandler(async (req: Request, res: Response) => {
    const { UID } = req.user;

    const credentials = await this.service.getAccountCredentials({ _id: UID });
    if (!credentials) throw new Error("Account doesnt exist");

    res.status(200).json({
      payload: credentials,
      message: "Fetched Successfully",
    });
  });

  accountDetails = expressAsyncHandler(async (req: Request, res: Response) => {
    const { id: UID } = req.params;

    const credentials = await this.service.getAccountCredentials({ _id: UID });
    if (!credentials) throw new Error("Account doesnt exist");

    res.status(200).json({
      payload: credentials,
      message: "Fetched Successfully",
    });
  });

  logout = expressAsyncHandler(async (req: Request, res: Response) => {
    const { id: UID } = req.params;

    res.status(200).json({
      payload: UID,
      message: "Fetched Successfully",
    });
  });
}

export default new AccountController();

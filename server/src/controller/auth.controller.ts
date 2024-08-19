import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import tokenUtils from "../utils/token.utils";
import EncryptionUtils from "../utils/encryption.utils";
import account from "../model/account.model";
import {
  AccountSchemaValue,
  AccountWithPreferenceValue,
} from "../interface/account.interface";
import runnerModel from "../model/runner.model";

class AccountController {
  constructor() {}

  register = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { body } = req;
      const { email, password, userName } = body as AccountWithPreferenceValue;

      // check if user exist
      const userExist = await account
        .findOne({ $or: [{ email }, { userName }] })
        .lean()
        .select("_id");
      if (userExist) throw new Error("User already exist");

      const hashedPassword = await EncryptionUtils.hashPassword(password);
      //

      const credentials = await account.create({
        ...body,
        password: hashedPassword,
      });

      if (!credentials)
        throw new Error("Something went wrong, Please try again later");

      // create runner data
      const runnerCredentials = await runnerModel.create({
        accountID: credentials._id,
        ...body,
      });

      if (!runnerCredentials)
        throw new Error("Something went wrong, Please try again later");

      res.status(200).json({
        payload: {
          UID: credentials?._id,
        },
        message: "Registered Successfully",
      });
    }
  );

  login = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;

      // check if user exist
      const userExist = await account
        .findOne({ email })
        .lean()
        .select("_id password");
      if (!userExist) throw new Error("User doesn't exist");

      const isPasswordCorrect = await EncryptionUtils.comparePassword(
        password,
        userExist.password
      );

      if (!isPasswordCorrect)
        throw new Error("Incorrect Password, Please try again later");

      const payload = { UID: userExist._id };

      const accessToken = tokenUtils.generateToken<any>(
        payload,
        process.env.ACCESS_TOKEN_EXPIRATION || "1h"
      );
      const refreshToken = tokenUtils.generateToken<any>(
        payload,
        process.env.REFRESH_TOKEN_EXPIRATION || "7d"
      );

      res.status(200).json({
        payload: {
          accessToken,
          refreshToken,
          user: {
            UID: userExist._id,
            role: userExist.role || "user",
            verified: true,
          },
        },
        message: "Login successfully",
      });
    }
  );

  forgotPassword = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {}
  );

  verifyAccount = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {}
  );

  changePassword = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {}
  );
}

export default new AccountController();

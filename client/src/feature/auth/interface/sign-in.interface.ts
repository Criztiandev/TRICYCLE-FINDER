import { z } from "zod";
import { LoginValidation } from "../validation";
import { IStoredDetails } from "@/feature/account/interface/account.interface";

export type LoginValue = z.infer<typeof LoginValidation>;

export interface LoginResponse {
  payload: {
    accessToken: any;
    refreshToken: any;
    user: IStoredDetails;
  };
  message: string;
}

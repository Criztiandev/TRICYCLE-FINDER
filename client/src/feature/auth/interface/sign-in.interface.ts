import { z } from "zod";
import { LoginValidation } from "../validation";

export type LoginValue = z.infer<typeof LoginValidation>;

export interface LoginResponse {
  payload: {
    accessToken: any;
    refreshToken: any;
    user: {
      UID: string;
      role: string;
      verified: boolean;
    };
  };
  message: string;
}

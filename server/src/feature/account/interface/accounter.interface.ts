import { z } from "zod";
import accountValidation from "../validation/account.validation";

export interface IAccount extends z.infer<typeof accountValidation> {
  role?: "user" | "rider";
  status: "active" | "inactive";
}

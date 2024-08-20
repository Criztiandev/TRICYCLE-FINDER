import mongoose from "mongoose";
import { IAccount } from "../interface/accounter.interface";

const accountSchema = new mongoose.Schema<IAccount>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("account", accountSchema);

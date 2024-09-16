import mongoose from "mongoose";
import { IAccount } from "../interface/accounter.interface";

const accountSchema = new mongoose.Schema<IAccount>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    course: { type: String, default: "" },
    facebook: { type: String, default: "" },
    department: { type: String, default: "" },
    licenseNumber: { type: String, default: "" },
    bodyNumber: { type: String, default: "" },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "user" },
    status: { type: String, required: true, default: "inactive" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("account", accountSchema);

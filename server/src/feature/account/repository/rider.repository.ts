import { FilterQuery, ObjectId } from "mongoose";
import accountModel from "../model/account.model";
import { IAccount } from "../interface/accounter.interface";

class RiderRepository {
  private model: typeof accountModel;

  constructor() {
    this.model = accountModel;
  }
}

export default RiderRepository;

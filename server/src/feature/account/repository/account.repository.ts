import { FilterQuery, ObjectId } from "mongoose";
import accountModel from "../model/account.model";
import { IAccount } from "../interface/accounter.interface";

class AccountRepository {
  private model: typeof accountModel;

  constructor() {
    this.model = accountModel;
  }

  public fetchAccountById = async (id: ObjectId, select?: string) => {
    return this.model
      .findById(id)
      .lean()
      .select(select || "");
  };

  public fetchAccountByFilter = async (
    filter: FilterQuery<IAccount>,
    select?: string
  ) => {
    return this.model
      .findOne(filter)
      .lean()
      .select(select || "");
  };

  public create = async (payload: IAccount) => {
    return this.model.create(payload);
  };
}

export default AccountRepository;

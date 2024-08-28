import { FilterQuery, ObjectId } from "mongoose";
import accountModel from "../model/account.model";
import { IAccount } from "../interface/accounter.interface";

class AccountRepository {
  private model: typeof accountModel;

  constructor() {
    this.model = accountModel;
  }

  public fetchAllAccount = async () => {
    return this.model.find({}).lean();
  };

  public getAllByHits = async (
    hits: FilterQuery<IAccount>,
    select?: string
  ) => {
    return this.model
      .find(hits)
      .lean()
      .select(select || "");
  };

  public fetchAccountById = async (id: ObjectId | string, select?: string) => {


    return await this.model
      .findOne({_id:id})
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

  public updateByHits = async (
    hits: FilterQuery<IAccount>,
    payload: Partial<IAccount>
  ) => {
    return this.model
      .updateOne(hits, payload, { new: true })
      .lean()
      .select("_id");
  };
}

export default AccountRepository;

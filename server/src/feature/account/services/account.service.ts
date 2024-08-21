import { FilterQuery, ObjectId } from "mongoose";
import AccountRepository from "../repository/account.repository";
import { IAccount } from "../interface/accounter.interface";

class AccountService {
  private repository: AccountRepository;
  constructor() {
    this.repository = new AccountRepository();
  }

  public getAllAccount = async (ownerID?: string) => {
    const query: any = {
      isActive: true,
    };

    if (ownerID) {
      query._id = { $ne: ownerID };
    }

    return await this.repository.fetchAllAccountByHits(query);
  };

  /**
   * Get the account details
   * @param hits
   * @returns
   */
  public getAccountCredentials = async (hits: FilterQuery<any>) => {
    const credentials = await this.repository.fetchAccountByFilter(
      hits,
      "-password"
    );
    if (!credentials) throw new Error("Account doesnt exist");
    return credentials;
  };

  /**
   * Check if the account exist
   * @param hits
   * @param select
   * @returns
   */
  public isAccountExist = async (
    hits: FilterQuery<IAccount>,
    select?: string
  ) => {
    return this.repository.fetchAccountByFilter(hits, select || "_id");
  };

  /**
   * Create the user
   * @param payload
   * @returns
   */

  /**
   *
   * @param ownerID
   * @returns
   */
  getAllActive = async (ownerID: string, role: IAccount["role"]) => {
    console.log("Active");

    return await this.repository.fetchAllAccountByHits(
      {
        $and: [{ _id: { $ne: ownerID } }, { role }, { status: "active" }],
      },
      "firstName lastName status phoneNumber"
    );
  };

  getAllInactive = async (ownerID: string, role: IAccount["role"]) => {
    console.log("Inactive");
    return await this.repository.fetchAllAccountByHits({
      $and: [{ _id: { $ne: ownerID } }, { role }, { status: "inactive" }],
    });
  };

  public createUser = async (payload: IAccount) => {
    const credentials = await this.repository.create(payload);

    if (!credentials) throw new Error("Create account failed");
    return credentials;
  };

  public updateAccountStatus = async (
    hit: string,
    status: IAccount["status"]
  ) => {
    const credentials = await this.repository.updateByHits(
      { $or: [{ email: hit }, { _id: hit }] },
      { status }
    );

    if (!credentials) throw new Error("Updated Failed");

    return credentials;
  };
}
export default AccountService;

import { FilterQuery, ObjectId } from "mongoose";
import AccountRepository from "../repository/account.repository";
import { IAccount } from "../interface/accounter.interface";

class AccountService {
  private repository: AccountRepository;
  constructor() {
    this.repository = new AccountRepository();
  }

  public getDetails = async (
    id: string | ObjectId
  ): Promise<IAccount | null> => {
    const credentials = await this.repository.fetchAccountById(
      id,
      "-password -role"
    );

    return credentials;
  };

  public getAllAccount = async (ownerID?: string) => {
    const query: any = {
      isActive: true,
    };

    if (ownerID) {
      query._id = { $ne: ownerID };
    }

    return await this.repository.getAllByHits(query);
  };

  /**
   * Get the account details
   * @param hits
   * @returns
   */
  public getAccountCredentials = async (
    hits: FilterQuery<any>,
    select?: string
  ) => {
    const credentials = await this.repository.fetchAccountByFilter(
      hits,
      select || "-password"
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
   *
   * @param ownerID
   * @returns
   */
  getAllByStatus = async (ownerID: string, role: IAccount["role"]) => {
    return await this.repository.getAllByHits(
      {
        $and: [{ _id: { $ne: ownerID } }, { role }, { status: "active" }],
      },
      "firstName lastName status phoneNumber"
    );
  };

  getAllInactive = async (ownerID: string, role: IAccount["role"]) => {
    return await this.repository.getAllByHits({
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

  // new

  getAllRiderByStatus = async (ownerID: string, status: string) => {
    let credentials: IAccount[];

    switch (status) {
      case "active":
        credentials = await this.repository.getAllByHits({
          $and: [
            { _id: { $ne: ownerID } },
            { status: "active" },
            { role: "rider" },
          ],
        });

        break;

      case "inactive":
        credentials = await this.repository.getAllByHits({
          $and: [
            { _id: { $ne: ownerID } },
            { status: "inactive" },
            { role: "rider" },
          ],
        });
        break;

      default:
        credentials = [];
        break;
    }

    return credentials;
  };
}
export default AccountService;

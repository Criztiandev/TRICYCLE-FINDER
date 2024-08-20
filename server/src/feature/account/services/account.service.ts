import { FilterQuery } from "mongoose";
import AccountRepository from "../repository/account.repository";
import { IAccount } from "../interface/accounter.interface";

class AccountService {
  private repository: AccountRepository;
  constructor() {
    this.repository = new AccountRepository();
  }

  public getAccountCredentials = async (hits: FilterQuery<any>) => {
    const credentials = await this.repository.fetchAccountByFilter(hits);
    if (!credentials) throw new Error("Account doesnt exist");
    return credentials;
  };

  public isAccountExist = async (hits: FilterQuery<IAccount>) => {
    return this.repository.fetchAccountByFilter(hits, "_id");
  };

  public createUser = async (payload: IAccount) => {
    const credentials = await this.repository.create(payload);

    if (!credentials) throw new Error("Create account failed");
    return credentials;
  };
}
export default AccountService;

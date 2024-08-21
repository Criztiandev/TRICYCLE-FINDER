import AccountService from "./account.service";

class RiderService {
  private accountService: AccountService;
  constructor() {
    this.accountService = new AccountService();
  }

  getAllRider = async () => {
    return await this.accountService.getAllAccount();
  };

  getAllRiderActive = async (ownerID: string) => {
    return await this.accountService.getAllActive(ownerID, "rider");
  };
  getAllRiderInactive = async (ownerID: string) => {
    return await this.accountService.getAllInactive(ownerID, "rider");
  };

  getRiderById = async () => {};
}
export default RiderService;

import { IBooking } from "../../booking/booking.interface";
import AccountService from "./account.service";

class RiderService {
  private accountService: AccountService;
  constructor() {
    this.accountService = new AccountService();
  }

  getAllRider = async () => {
    return await this.accountService.getAllAccount();
  };

  getAllRiderByStatus = async (ownerID: string, status: IBooking["status"]) => {
    return await this.accountService.getAllByStatus(ownerID, status);
  };

  getRiderById = async () => {};
}
export default RiderService;

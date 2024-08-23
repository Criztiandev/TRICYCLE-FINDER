import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import RiderService from "../services/rider.service";
import { IAccount } from "../interface/accounter.interface";
import AccountService from "../services/account.service";
import BookingRequestService from "../../booking/service/booking-request.service";

class RiderController {
  private service: RiderService;
  private accountService: AccountService;
  private bookingRequestService: BookingRequestService;
  constructor() {
    this.service = new RiderService();
    this.accountService = new AccountService();
    this.bookingRequestService = new BookingRequestService();
  }

  fetchAllRider = expressAsyncHandler(async (req: Request, res: Response) => {
    const credentials = await this.service.getAllRider();

    res.status(200).json({
      payload: credentials,
      message: "Fetched Successfully",
    });
  });

  fetchAllRiderByStatus = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { UID } = req.user;
      const { status } = req.params;

      const credentials = await this.accountService.getAllRiderByStatus(
        UID,
        status
      );

      console.log(credentials);

      res.status(200).json({
        payload: credentials,
        message: "Fetched Successfully",
      });
    }
  );

  public fetchAllRiderBookingRequest = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { UID: selfID } = req.user;
      const existingAccount = await this.accountService.isAccountExist({
        _id: selfID,
      });

      if (!existingAccount) throw new Error("Account doesnt exist");
      // Get all the pending booking requests for the user
      const bookingRequest =
        await this.bookingRequestService.getAllBookingRequest(
          selfID,
          "pending"
        );

      res.status(200).json({
        payload: bookingRequest,
        message: "Fetched successfully",
      });
    }
  );
}

export default new RiderController();

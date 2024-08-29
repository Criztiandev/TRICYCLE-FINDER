import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import RiderService from "../services/rider.service";
import { IAccount } from "../interface/accounter.interface";
import AccountService from "../services/account.service";
import BookingRequestService from "../../booking/service/booking-request.service";
import BookingService from "../../booking/service/booking.service";

class RiderController {
  private service: RiderService;
  private accountService: AccountService;
  private bookingRequestService: BookingRequestService;
  private bookingService: BookingService;
  constructor() {
    this.service = new RiderService();
    this.accountService = new AccountService();
    this.bookingRequestService = new BookingRequestService();
    this.bookingService = new BookingService();
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

  public getAllTransactions = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { UID } = req.user;

      const transaction = await this.bookingService.getAllTransactions(UID);

      res.status(200).json({
        payload: transaction,
        message: "Fetched successfully",
      });
    }
  );
}

export default new RiderController();

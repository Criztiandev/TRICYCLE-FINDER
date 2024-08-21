import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import AccountService from "../services/account.service";
import BookingService from "../../booking/service/booking.service";
import BookingRequestService from "../../booking/service/booking-request.service";

class AccountController {
  private service: AccountService;
  private bookingRequestService: BookingRequestService;
  constructor() {
    this.service = new AccountService();
    this.bookingRequestService = new BookingRequestService();
  }

  profileDetails = expressAsyncHandler(async (req: Request, res: Response) => {
    const { UID } = req.user;

    const credentials = await this.service.getAccountCredentials({ _id: UID });
    if (!credentials) {
      res.status(404);
      throw new Error("Account doesnt exist");
    }

    res.status(200).json({
      payload: credentials,
      message: "Fetched Successfully",
    });
  });

  accountDetails = expressAsyncHandler(async (req: Request, res: Response) => {
    const { id: ridersID } = req.params;
    const { UID: ownerID } = req.user;

    const credentials = await this.service.getAccountCredentials({
      _id: ridersID,
    });
    if (!credentials) {
      res.status(404);
      throw new Error("Account doesnt exist");
    }

    const existingRequest =
      await this.bookingRequestService.getBookingRequestDetails(
        ownerID,
        ridersID
      );

    res.status(200).json({
      payload: {
        ...credentials,
        bookingStatus: existingRequest?.status || "N/A",
      },
      message: "Fetched Successfully",
    });
  });

  logout = expressAsyncHandler(async (req: Request, res: Response) => {
    const { id: UID } = req.user;

    await this.service.updateAccountStatus(UID, "inactive");

    res.status(200).json({
      payload: UID,
      message: "Fetched Successfully",
    });
  });
}

export default new AccountController();

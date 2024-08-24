import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import AccountService from "../services/account.service";
import BookingService from "../../booking/service/booking.service";
import BookingRequestService from "../../booking/service/booking-request.service";
import BookingRepository from "../../booking/repository/booking.repository";

class UserController {
  private service: AccountService;
  private bookingRequestService: BookingRequestService;
  private bookingRepository: BookingRepository;
  constructor() {
    this.service = new AccountService();
    this.bookingRequestService = new BookingRequestService();
    this.bookingRepository = new BookingRepository();
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
    const { UID: ownerID } = req.user;
    const { id: accountUD } = req.user;

    const credentials = await this.service.getDetails(ownerID);
    if (!credentials) throw new Error("Account doest exist");

    const existingBooking =
      await this.bookingRepository.getBookingDetailsByHits({
        $and: [
          { recipientID: accountUD },
          { riderID: ownerID },
          { status: "pending" },
        ],
      });

    res.status(200).json({
      payload: {
        booking: existingBooking,
        ...credentials,
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

export default new UserController();

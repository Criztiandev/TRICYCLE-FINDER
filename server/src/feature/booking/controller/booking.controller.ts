import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import BookingService from "../service/booking.service";
import AccountService from "../../account/services/account.service";

class BookingController {
  private bookingService: BookingService;
  private accountService: AccountService;

  constructor() {
    this.accountService = new AccountService();
    this.bookingService = new BookingService();
  }
  public getBookingDetailsByRequestID = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { id: targetID } = req.params;

      const credentials = await this.bookingService.getBookingDetails(targetID);
      if (!credentials) throw new Error("Booking doesnt exist");

      console.log(credentials);

      res.status(200).json({
        payload: credentials,
        message: "Fetched successfully",
      });
    }
  );

  public getBookingDetailsByID = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { id: targetID } = req.params;
    }
  );
}

export default new BookingController();

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

      const credentials = await this.bookingService.getActiveBooking(targetID);
      if (!credentials) throw new Error("Booking doesnt exist");

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

  public getActiveSession = expressAsyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { UID } = req.user;

      // get the current active session that is accepted
      const bookingRequest = await this.bookingService.getActiveBooking(UID);

      if (!bookingRequest) {
        return res.status(200).json({
          payload: {
            riderID: null,
            recipientID: null,
          },
        });
      }

      res.status(200).json({
        payload: bookingRequest,
      });
    }
  );
}

export default new BookingController();

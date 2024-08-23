import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import BookingService from "../service/booking.service";
import AccountService from "../../account/services/account.service";
import { IBooking } from "../booking.interface";
import BookingRequestService from "../service/booking-request.service";

class BookingRiderController {
  private accountService: AccountService;
  private bookingRequestService: BookingRequestService;
  constructor() {
    this.accountService = new AccountService();
    this.bookingRequestService = new BookingRequestService();
  }

  public riderDetails = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { UID } = req.user;
      const { id: riderID } = req.params;

      // get the rider account
      const credentials = await this.accountService.getDetails(riderID);

      // get if the rider has a pending booking from the current user
      const request = await this.bookingRequestService.getRequestByRiderID(
        UID,
        riderID
      );

      if (!request) {
        res.status(200).json({
          payload: {
            ...credentials,
            availability: "available",
            status: "N/A",
          },
        });
      }

      res.status(200).json({
        payload: {
          ...credentials,
          ...request,
          availability: "available",
        },
      });
    }
  );
}

export default new BookingRiderController();

import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import BookingService from "../service/booking.service";
import AccountService from "../../account/services/account.service";
import { IBooking } from "../booking.interface";
import BookingRequestService from "../service/booking-request.service";
import ratingModel from "../../account/model/rating.model";

class BookingRiderController {
  private accountService: AccountService;
  private bookingRequestService: BookingRequestService;
  constructor() {
    this.accountService = new AccountService();
    this.bookingRequestService = new BookingRequestService();
  }

  public riderDetails = expressAsyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      try {
        const { UID } = req.user;
        const { id: riderID } = req.params;

        // get the rider account
        const credentials = await this.accountService.getDetails(riderID);
        if (!credentials) {
          return res.status(404).json({ error: "Account does not exist" });
        }

        // get if the rider has a pending booking from the current user
        const request = await this.bookingRequestService.getRequestByRiderID(
          UID,
          riderID
        );

        if (!request) {
          return res.status(200).json({
            payload: {
              ...credentials,
              availability: "available",
              status: "N/A",
            },
          });
        }

        return res.status(200).json({
          payload: {
            ...credentials,
            ...request,
            availability: "available",
          },
        });
      } catch (e) {
        console.log(e);
      }
    }
  );

  public rate = expressAsyncHandler(async (req: Request, res: Response) => {
    const { UID } = req.user;
    const { id: riderID } = req.params;
    const payload = req.body;

    // Get the rider account
    const credentials = await this.accountService.getDetails(riderID);
    if (!credentials) throw new Error("Account does not exist");

    // Check if the user has already rated twice today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const ratingCount = await ratingModel.countDocuments({
      accountID: UID,
      createdAt: { $gte: today, $lt: tomorrow },
    });

    if (ratingCount >= 1) {
      throw new Error("You have already rated today");
    }

    // Create the rating
    const createRating = await ratingModel.create({
      accountID: UID,
      senderID: riderID,
      ...payload,
    });

    if (!createRating) throw new Error("Create Rating Failed");

    res.status(200).json({
      payload: null,
    });
  });
}

export default new BookingRiderController();

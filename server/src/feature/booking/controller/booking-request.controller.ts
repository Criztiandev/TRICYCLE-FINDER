import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import AccountService from "../../account/services/account.service";
import BookingService from "../service/booking.service";
import BookingRequestService from "../service/booking-request.service";
import {
  IBooking,
  IBookingRequest,
  IBookingRequestBody,
} from "../booking.interface";

class BookingRequest {
  private accountService: AccountService;
  private bookingService: BookingService;
  private bookingRequestService: BookingRequestService;
  constructor() {
    this.accountService = new AccountService();
    this.bookingService = new BookingService();
    this.bookingRequestService = new BookingRequestService();
  }

  /**
   * Validate if the account exist, if now return an error
   * @param id ID of the user
   */
  private async validateAccount(id: string) {
    const existingAccount = await this.accountService.isAccountExist({
      _id: id,
    });
    if (!existingAccount) throw new Error("Account does not exist");

    return existingAccount;
  }

  public getAllSentBookingRequestOfUser = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { UID: selfID } = req.user;
      await this.validateAccount(selfID);

      // Get all the pending sent booking requests for the user
      const bookingRequest =
        await this.bookingRequestService.getAllBookingSentRequest(
          selfID,
          "pending"
        );

      res.status(200).json({
        payload: bookingRequest,
        message: "Fetched successfully",
      });
    }
  );

  public getAllBookingRequestHistory = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { UID: selfID } = req.user;
      await this.validateAccount(selfID);

      // Get all the booking requests for the user
      const bookingRequest =
        await this.bookingRequestService.getAllBookingRequest(selfID, "all");

      res.status(200).json({
        payload: bookingRequest,
        message: "Fetched successfully",
      });
    }
  );

  public getAllBookingSentRequestHistory = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { UID: selfID } = req.user;
      await this.validateAccount(selfID);

      // Get all the sent booking requests for the user
      const bookingRequest =
        await this.bookingRequestService.getAllBookingSentRequest(
          selfID,
          "all"
        );

      res.status(200).json({
        payload: bookingRequest,
        message: "Fetched successfully",
      });
    }
  );

  public acceptBookingRequest = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { id: targetID } = req.params;
      const { UID: selfID } = req.user;
      await this.validateAccount(selfID);

      // Get all the sent booking requests for the user
      const bookingRequest =
        await this.bookingRequestService.getBookingRequestDetails(
          selfID,
          targetID
        );

      if (!bookingRequest) throw new Error("Booking request doest exist");

      // accept the booking request
      const acceptRequest = await this.bookingRequestService.accept(
        selfID,
        (bookingRequest as any)?._id
      );

      if (!acceptRequest)
        throw new Error("Something went wrong, Please try again later");

      res.status(200).json({
        payload: bookingRequest,
        message: "Fetched successfully",
      });
    }
  );

  public completeBookingRequest = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { id: hitID } = req.params;
      const { UID: selfID } = req.user;
      await this.validateAccount(selfID);

      const completeResult = await this.bookingService.done(selfID, hitID);

      if (!completeResult)
        throw new Error("Something went wrong, Please try again later");

      res.status(200).json({
        payload: hitID,
        message: "Deleted successfully",
      });
    }
  );

  // New

  public createBooking = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { id: riderID } = req.params;
      const { UID } = req.user;
      const payload = req.body as Pick<
        IBooking,
        "dropoffLocation" | "pickupLocation"
      >;

      // check if the account exist
      const credentials = await this.accountService.getDetails(riderID);
      if (!credentials) throw new Error("Account doesnt exist");

      // check if there is already existing on the current id
      const request = await this.bookingRequestService.getRequestByRiderID(
        UID,
        riderID
      );
      if (request) throw new Error("Booking request already exist");

      const createdRequest = await this.bookingRequestService.create({
        senderID: UID,
        riderID,
        payload,
      });

      if (!createdRequest) throw new Error("Creation Failed");

      res.status(200).json({
        payload: null,
        message: "Created successfully",
      });
    }
  );

  public cancelBooking = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { id: bookingRequestID } = req.params;
      const { UID } = req.user;

      // check if there is already existing on the current id
      const request = await this.bookingRequestService.getRequestByID(
        bookingRequestID
      );

      if (!request) {
        throw new Error("Invalid Booking request");
      }

      // Cancel the  Booking
      const cancelRequest = await this.bookingRequestService.cancel({
        bookingID: request.bookingID,
        senderID: UID,
        riderID: request?.riderID,
      });

      if (!cancelRequest) throw new Error("Request Failed");

      res.status(200).json({
        payload: request?.riderID,
        message: "Deleted successfully",
      });
    }
  );
}

export default new BookingRequest();

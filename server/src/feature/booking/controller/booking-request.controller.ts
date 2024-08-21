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

  public getAllBookingRequestOfRider = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { UID: selfID } = req.user;
      await this.validateAccount(selfID);

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
      const { id: bookingID } = req.params;
      const { UID: selfID } = req.user;
      await this.validateAccount(selfID);

      // Get all the sent booking requests for the user
      const bookingRequest =
        await this.bookingRequestService.getBookingRequestDetails(
          selfID,
          bookingID
        );

      if (!bookingRequest) throw new Error("Booking request doest exist");

      // accept the booking reuqes
      const acceptRequest = await this.bookingRequestService.accept(
        selfID,
        bookingID
      );

      if (!acceptRequest)
        throw new Error("Something went wrong, Please try again later");

      res.status(200).json({
        payload: bookingRequest,
        message: "Fetched successfully",
      });
    }
  );

  public createBooking = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { riderID, dropoffLocation, pickupLocation } =
        req.body as IBookingRequestBody;
      const { UID: selfID } = req.user;

      // Check if the target account exists

      await this.validateAccount(riderID);

      // create booking and then the request

      const requestResult = await this.bookingRequestService.create({
        senderID: selfID,
        recipientID: riderID,
      });

      const bookingResult = await this.bookingService.create({
        bookingRequestID: requestResult._id as any,
        dropoffLocation,
        pickupLocation,
      });

      if (!bookingResult) throw new Error("Booking Failed");

      res.status(200).json({
        payload: requestResult?._id,
        message: "Created successfully",
      });
    }
  );

  public cancelBookingRequest = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { id: hitID } = req.params;
      const { UID: selfID } = req.user;
      await this.validateAccount(selfID);

      const cancelRequest = await this.bookingRequestService.cancel(
        selfID,
        hitID
      );

      if (!cancelRequest)
        throw new Error("Something went wrong, Please try again later");

      const bookingResult = await this.bookingService.delete(
        cancelRequest?._id as any
      );
      if (!bookingResult) throw new Error("Deletion Failed");

      res.status(200).json({
        payload: hitID,
        message: "Deleted successfully",
      });
    }
  );
}

export default new BookingRequest();

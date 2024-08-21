import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import AccountService from "../../account/services/account.service";
import BookingService from "../service/booking.service";
import BookingRequestService from "../service/booking-request.service";

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

  public cancelBookingRequest = expressAsyncHandler(
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

      const acceptRequest = await this.bookingRequestService.cancel(
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
      const { id: targetID } = req.params;
      const { UID: selfID } = req.user;

      // Check if the target account exists
      await this.validateAccount(targetID);

      // Create a new booking request
      const credentials = await this.bookingRequestService.create({
        senderID: selfID,
        recipientID: targetID,
      });

      res.status(200).json({
        payload: credentials,
        message: "Created successfully",
      });
    }
  );
}

export default new BookingRequest();

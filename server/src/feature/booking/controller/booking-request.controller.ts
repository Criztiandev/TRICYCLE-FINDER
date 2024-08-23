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
import { io } from "../../..";

class BookingRequest {
  private accountService: AccountService;
  private bookingService: BookingService;
  private bookingRequestService: BookingRequestService;
  constructor() {
    this.accountService = new AccountService();
    this.bookingService = new BookingService();
    this.bookingRequestService = new BookingRequestService();
  }

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

  public acceptBooking = expressAsyncHandler(
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

      const acceptRequest = await this.bookingRequestService.accept(
        bookingRequestID
      );

      if (!acceptRequest) throw new Error("Failed to Accept");

      io.emit("booking-accepted", bookingRequestID);

      res.status(200).json({
        payload: UID,
        message: "Accepted successfully",
      });
    }
  );

  public doneBooking = expressAsyncHandler(
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

      const doneBooking = await this.bookingRequestService.done(
        bookingRequestID
      );

      if (!doneBooking) throw new Error("Failed to Done");

      io.emit("booking-done", bookingRequestID);

      res.status(200).json({
        payload: UID,
        message: "Done successfully",
      });
    }
  );
}

export default new BookingRequest();

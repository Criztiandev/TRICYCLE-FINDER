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

  public getUserRequest = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { id: userID } = req.params;
      const { UID: riderID } = req.user;

      const credentials = await this.accountService.getDetails(userID);
      if (!credentials) throw new Error("Account doesnt exist");

      const bookingRequest =
        await this.bookingRequestService.getRequestByRiderID(userID, riderID);
      if (!bookingRequest) throw new Error("Booking Request doesnt exist");

      const booking = await this.bookingService.getDetails(
        bookingRequest?.bookingID as any,
        "dropoffLocation pickupLocation status"
      );

      res.status(200).json({
        payload: {
          ...credentials,
          ...booking,
          _id: bookingRequest?._id,
          status: bookingRequest?.status,
        },
      });
    }
  );

  public getAllRequest = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { UID } = req.user;

      // check if there an active booking registered to the user

      // get all the request that is related to rider
      const credentials = await this.bookingRequestService.getAllBookingRequest(
        UID,
        "pending"
      );
      if (!credentials) throw new Error("Request doesnt found");

      res.status(200).json({
        payload: credentials,
      });
    }
  );

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
      const { UID, role } = req.user;

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

      const payload = {
        bookingID: bookingRequestID,
        role,
      };
      io.emit("booking-accepted", payload);

      res.status(200).json({
        payload: UID,
        message: "Accepted successfully",
      });
    }
  );

  public doneBooking = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { id: bookingRequestID } = req.params;
      const { UID, role } = req.user;

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

      const payload = {
        bookingID: bookingRequestID,
        role,
      };

      io.emit("booking-done", payload);

      res.status(200).json({
        payload: UID,
        message: "Done successfully",
      });
    }
  );
}

export default new BookingRequest();

import { FilterQuery } from "mongoose";
import { IBooking, IBookingRequest } from "../booking.interface";
import BookingRepository from "../repository/booking.repository";
import BookingRequestService from "./booking-request.service";
import AccountService from "../../account/services/account.service";

class BookingService {
  private bookingRepository: BookingRepository;
  private bookingRequestService: BookingRequestService;
  private accountService: AccountService;
  constructor() {
    this.bookingRequestService = new BookingRequestService();
    this.bookingRepository = new BookingRepository();
    this.accountService = new AccountService();
  }

  getBookingDetails = async (hits: string) => {
    const result = await this.bookingRequestService.getBookingRequestByHits({
      $or: [{ senderID: hits }, { _id: hits }],
    });

    if (!result) throw new Error("Booking request doesnt exist");

    const accountCredentials = await this.accountService.getAccountCredentials(
      {
        _id: result?.senderID,
      },
      "firstName lastName phoneNumber"
    );

    if (!accountCredentials) throw new Error("Account doesnt exist");

    const credentials = await this.bookingRepository.getBookingDetailsByHits({
      $or: [{ bookingRequestID: result?._id }],
    });

    if (!credentials) throw new Error("Booking doesnt exist");

    return {
      ...accountCredentials,
      ...credentials,
      accountId: accountCredentials._id,
      status: result?.status,
    };
  };

  create = async (payload: IBooking) => {
    const credentials = await this.bookingRepository.create(payload);

    if (!credentials) throw new Error("Service Create failed");

    return credentials;
  };

  delete = async (hits: Pick<IBooking, "_id" | "bookingRequestID">) => {
    const result = await this.bookingRepository.deleteByHits({
      $or: [{ _id: hits }, { bookingRequestID: hits }],
    });

    if (!result) throw new Error("Deletion Failed");

    return result;
  };

  complete = async (hits: string) => {
    const result = await this.bookingRepository.updateByHits(
      { $or: [{ _: hits }, { bookingRequestID: hits }] },
      { status: "complete" }
    );

    if (!result) throw new Error("Complete Failed");

    return result;
  };

  done = async (ownerID: string, hits: string) => {
    // delete the request
    const deleteRequestResult = await this.bookingRequestService.deleteRequest(
      hits
    );
    if (!deleteRequestResult) throw new Error("Deletion Failed failed");

    const completeResult = await this.complete(hits);
    if (!completeResult) throw new Error("Completion Failed");

    return completeResult;
  };
}

export default BookingService;

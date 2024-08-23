import { FilterQuery, ObjectId } from "mongoose";
import { IBookingRequest } from "../booking.interface";
import BookingRequestRepository from "../repository/booking-request.repository";
import BookingService from "./booking.service";

class BookingRequestService {
  private bookingRequestRepository: BookingRequestRepository;
  constructor() {
    this.bookingRequestRepository = new BookingRequestRepository();
  }

  getAllBookingRequest = async (
    ownerID: string,
    status: IBookingRequest["status"]
  ) => {
    const query = {
      recipientID: ownerID,
      ...(status && { status }), // Include status only if it's provided
    };

    return this.bookingRequestRepository.fetchAllBookingRequestByHits(query);
  };

  getAllBookingSentRequest = async (
    ownerID: string,
    status: IBookingRequest["status"]
  ) => {
    const query = {
      senderID: ownerID,
      ...(status && { status }), // Include status only if it's provided
    };

    return this.bookingRequestRepository.fetchAllBookingRequestByHits(query);
  };

  getBookingRequestDetails = async (ownerID: string, hit: string) => {
    const existingBookingRequest =
      await this.bookingRequestRepository.fetchBookingRequestDetailsByHits({
        $and: [{ status: "pending" }, { isDeleted: false }],
        $or: [{ _id: hit }, { senderID: hit }],
      });

    return existingBookingRequest;
  };

  getBookingRequestByHits = async (hits: FilterQuery<IBookingRequest>) => {
    const existingBookingRequest =
      await this.bookingRequestRepository.fetchBookingRequestDetailsByHits(
        hits
      );

    return existingBookingRequest;
  };

  /**
   *
   * @param senderID - Recipient ID that you want to accept
   * @param bookingID - Booking request ID
   * @returns id of the booking request
   */

  create = async (payload: IBookingRequest) => {
    const { senderID, recipientID } = payload;

    const existingRequest = await this.getBookingRequestDetails(
      senderID,
      recipientID
    );

    if (existingRequest) throw new Error("Booking request already exist");

    return this.bookingRequestRepository.create(payload);
  };

  accept = async (targetID: string, bookingID: ObjectId | string) => {
    await this.bookingRequestRepository.updateRequestById(
      {
        $and: [{ recipientID: targetID }, { _id: bookingID }],
      },
      { status: "accepted", isDeleted: true }
    );
    return bookingID;
  };

  cancel = async (ownerID: string, hits: string) => {
    // Get all the sent booking requests for the user
    const bookingRequest = await this.getBookingRequestDetails(ownerID, hits);

    // delete the request
    const cancelResult = await this.bookingRequestRepository.deleteRequestById(
      hits
    );
    if (!cancelResult) throw new Error("Cancelation failed");

    return bookingRequest;
  };

  deleteRequest = async (hits: string) => {
    return this.bookingRequestRepository.deleteRequestById(hits);
  };
}

export default BookingRequestService;

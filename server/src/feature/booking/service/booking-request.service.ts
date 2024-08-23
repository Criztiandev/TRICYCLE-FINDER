import { FilterQuery, ObjectId } from "mongoose";
import {
  ICreateBooking,
  IBookingRequest,
  ICancelBooking,
} from "../booking.interface";
import BookingRequestRepository from "../repository/booking-request.repository";
import BookingRepository from "../repository/booking.repository";

class BookingRequestService {
  private bookingRequestRepository: BookingRequestRepository;
  private bookingRepository: BookingRepository;
  constructor() {
    this.bookingRequestRepository = new BookingRequestRepository();
    this.bookingRepository = new BookingRepository();
  }

  public getRequestByRiderID = async (userID: any, riderID: any) => {
    const credentials =
      await this.bookingRequestRepository.fetchBookingRequestByHits(
        {
          $and: [{ riderID: riderID }, { recipientID: userID }],
        },
        "_id status"
      );

    return credentials;
  };

  public getRequestByID = async (BRID: any) => {
    const credentials =
      await this.bookingRequestRepository.fetchBookingRequestByHits({
        _id: BRID,
      });

    return credentials;
  };

  // OLD

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

  // New

  create = async (payload: ICreateBooking) => {
    const { riderID, senderID, payload: data } = payload;

    // create booking credentials
    const bookingCredentials = await this.bookingRepository.create({
      riderID,
      recipientID: senderID,
      ...data,
    });

    if (!bookingCredentials) throw new Error("Booking create failed");

    const request = await this.bookingRequestRepository.create({
      bookingID: bookingCredentials._id,
      riderID,
      recipientID: senderID,
    });

    if (!request) {
      throw new Error("Booking Request creation failed");
    }

    return request;
  };

  cancel = async (payload: ICancelBooking) => {
    const { riderID, senderID, bookingID } = payload;

    const deleteBooking = await this.bookingRepository.deleteByHits({
      $and: [{ _id: bookingID }, { riderID }, { recipientID: senderID }],
    });

    if (!deleteBooking) throw new Error("Delete Booking Failed");

    return await this.bookingRequestRepository.deleteByHits({
      $and: [{ bookingID }, { riderID }, { recipientID: senderID }],
    });
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

  deleteRequest = async (hits: string) => {
    return this.bookingRequestRepository.deleteRequestById(hits);
  };
}

export default BookingRequestService;

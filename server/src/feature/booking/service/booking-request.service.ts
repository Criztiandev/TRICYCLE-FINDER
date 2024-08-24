import { FilterQuery, ObjectId } from "mongoose";
import {
  ICreateBooking,
  IBookingRequest,
  ICancelBooking,
} from "../booking.interface";
import BookingRequestRepository from "../repository/booking-request.repository";
import BookingRepository from "../repository/booking.repository";
import { IAccount } from "../../account/interface/accounter.interface";
import AccountRepository from "../../account/repository/account.repository";

class BookingRequestService {
  private bookingRequestRepository: BookingRequestRepository;
  private bookingRepository: BookingRepository;
  private accountRepository: AccountRepository;
  constructor() {
    this.bookingRequestRepository = new BookingRequestRepository();
    this.bookingRepository = new BookingRepository();
    this.accountRepository = new AccountRepository();
  }

  public getRequestByRiderID = async (userID: any, riderID: any) => {
    const credentials =
      await this.bookingRequestRepository.fetchBookingRequestByHits(
        {
          $and: [{ riderID: riderID }, { recipientID: userID }],
        },
        "_id status bookingID"
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

  getBookingRequestDetails = async (ownerID: string, hit: string) => {
    const existingBookingRequest =
      await this.bookingRequestRepository.fetchBookingRequestDetailsByHits({
        $and: [{ status: "pending" }, { isDeleted: false }],
        $or: [{ _id: hit }, { senderID: hit }],
      });

    return existingBookingRequest;
  };

  getBookingRequestByHits = async (
    hits: FilterQuery<IBookingRequest>,
    select?: string
  ) => {
    const existingBookingRequest =
      await this.bookingRequestRepository.fetchBookingRequestDetailsByHits(
        hits,
        select || ""
      );

    return existingBookingRequest;
  };

  // New

  getAllBookingRequest = async (ownerID: string, status: string) => {
    const credentials =
      await this.bookingRequestRepository.fetchAllBookingRequestByHits({
        $and: [{ riderID: ownerID }, { status: "pending" }],
      });

    return credentials;
  };

  getAllTransactions = async (ownerID: string) => {
    // check if there is active session
    // if not get all the current transaction of the rider

    const transactions = await this.bookingRequestRepository.getAllByHits({
      $and: [{ riderID: ownerID }, { status: "done" }],
    });

    return transactions;
  };

  /**
   * This function create a booking request and booking
   * @param payload This paylopad is all the necessary data that we want to create a request
   * @returns
   */
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

  /**
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   */

  /**
   * This function let cancel the current sent request to the rider
   * @param payload This payload composed the necessary details such as rirderID, senderID anb the bookingID
   * @returns
   */

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

  /**
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   */

  /**
   * This function will accept the booking from the user using the rider account and send thru Socket io
   * @param bookingID The booking ID that we want to update
   * @returns
   */

  accept = async (bookingID: string) => {
    // Update the Request with accepted
    const updatedRequest = await this.bookingRequestRepository.updateByHits(
      { $and: [{ _id: bookingID }, { status: "pending" }] },
      { status: "accepted" }
    );
    if (!updatedRequest) throw new Error("Updated failed, Already Accepted");

    // Update the rider account as booked
    const riderCredentials = await this.accountRepository.updateByHits(
      { _id: updatedRequest?.riderID },
      { status: "booked" }
    );
    if (!riderCredentials) throw new Error("Booking failed");

    // Update the booking as accepted

    const updatedBooking = await this.bookingRepository.updateByHits(
      { $and: [{ _id: updatedRequest?.bookingID }, { status: "pending" }] },
      { status: "accepted" }
    );

    if (!updatedBooking) throw new Error("Updated failed, Already Accepted");

    return bookingID;
  };

  /**
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   */

  /**
   * This function will done the booking from the user using the rider account and send thru Socket io
   * @param bookingID The booking ID that we want to update
   * @returns
   */

  done = async (bookingID: string) => {
    const requestDetails = await this.bookingRequestRepository.getOneByHits(
      { $and: [{ _id: bookingID }, { status: "accepted" }] },
      "riderID bookingID"
    );

    console.log(requestDetails);

    if (!requestDetails) throw new Error("Booking Request doesnt exist");

    // Update the rider account as booked
    const riderCredentials = await this.accountRepository.updateByHits(
      { _id: requestDetails?.riderID },
      { status: "active" }
    );

    if (!riderCredentials) throw new Error("Booking failed");

    const deletedRequest = await this.bookingRequestRepository.deleteByHits({
      $and: [{ _id: bookingID }, { status: "accepted" }],
    });

    if (!deletedRequest) throw new Error("Delete Failed failed, Already Done");

    const updatedBooking = await this.bookingRepository.updateByHits(
      {
        $and: [{ _id: requestDetails.bookingID }, { status: "accepted" }],
      },
      { status: "done" }
    );

    if (!updatedBooking) throw new Error("Updated failed, Already Done");

    return "12";
  };
}

export default BookingRequestService;

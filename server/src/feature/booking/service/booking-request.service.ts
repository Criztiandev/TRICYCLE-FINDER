import { IBookingRequest } from "../booking.interface";
import BookingRequestRepository from "../repository/booking-request.repository";

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

  getBookingRequestDetails = async (senderID: string, bookingID: string) => {
    const existingBookingRequest =
      await this.bookingRequestRepository.fetchBookingRequestDetailsByHits({
        $and: [{ senderID }, { _id: bookingID }, { status: "pending" }],
      });

    return existingBookingRequest;
  };

  /**
   *
   * @param senderID - Recipient ID that you want to accept
   * @param bookingID - Booking request ID
   * @returns id of the booking request
   */
  accept = async (senderID: string, bookingID: string) => {
    await this.bookingRequestRepository.updateRequestById(
      {
        $and: [{ recipientID: senderID }, { _id: bookingID }],
      },
      { status: "accepted" }
    );

    return bookingID;
  };

  create = async (payload: IBookingRequest) => {
    const { senderID, recipientID } = payload;

    const existingRequest = await this.getBookingRequestDetails(
      senderID,
      recipientID
    );
    if (existingRequest) throw new Error("Booking request already exist");

    return this.bookingRequestRepository.create(payload);
  };
  /**
   *
   * @param senderID - Recipient ID that you want to accept
   * @param bookingID - Booking request ID
   * @returns id of the booking request
   */
  cancel = async (senderID: string, bookingID: string) => {
    await this.bookingRequestRepository.updateRequestById(
      {
        $and: [{ recipientID: senderID }, { _id: bookingID }],
      },
      { status: "rejected ", isDeleted: true }
    );

    return bookingID;
  };
}

export default BookingRequestService;

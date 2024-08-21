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

  getBookingRequestDetails = async (senderID: string, hit: string) => {
    const existingBookingRequest =
      await this.bookingRequestRepository.fetchBookingRequestDetailsByHits({
        $and: [{ senderID }, { status: "pending" }],
        $or: [{ _id: hit }, { recipientID: hit }],
      });

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

  accept = async (senderID: string, bookingID: string) => {
    await this.bookingRequestRepository.updateRequestById(
      {
        $and: [{ recipientID: senderID }, { _id: bookingID }],
      },
      { status: "accepted" }
    );

    return bookingID;
  };

  cancel = async (ownerID: string, hits: string) => {
    // Get all the sent booking requests for the user
    const bookingRequest = await this.getBookingRequestDetails(ownerID, hits);

    console.log(hits);

    if (!bookingRequest) throw new Error("Booking request doest exist");

    // delete the request
    const cancelResult = await this.bookingRequestRepository.deleteRequestById(
      hits
    );
    if (!cancelResult) throw new Error("Cancelation failed");

    // delete also the booking

    return bookingRequest;
  };
}

export default BookingRequestService;

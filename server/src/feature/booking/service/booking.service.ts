import { FilterQuery } from "mongoose";
import { IBooking, IBookingRequest } from "../booking.interface";
import BookingRepository from "../repository/booking.repository";
import BookingRequestRepository from "../repository/booking-request.repository";

class BookingService {
  private bookingRepository: BookingRepository;
  private bookingRequestRepository: BookingRequestRepository;

  constructor() {
    this.bookingRepository = new BookingRepository();
    this.bookingRequestRepository = new BookingRequestRepository();
  }

  public getDetails = async (bookingID: string, select?: string) => {
    return await this.bookingRepository.findByHits({ _id: bookingID }, select);
  };

  public getDetailsByUser = async (userID: String, select?: string) => {
    return await this.bookingRepository.findByHits({
      $or: [{ recipientID: userID }],
    });
  };

  public getDetailsByRider = async (riderID: String, select?: string) => {
    return await this.bookingRepository.findByHits({
      $or: [{ riderID: riderID }],
    });
  };

  public getDetailsByBoth = async (
    riderID: String,
    userID: String,
    select?: string
  ) => {
    return await this.bookingRepository.findByHits({
      $and: [
        { riderID: riderID },
        { recipientID: userID },
        { status: "pending" },
      ],
    });
  };

  public getActiveBooking = async (ownerID: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today

    const request = await this.bookingRequestRepository.getOneByHits(
      {
        $or: [{ recipientID: ownerID }, { riderID: ownerID }],
        $and: [
          { status: "accepted" },
          {
            createdAt: {
              $gte: today,
              $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
            },
          },
        ],
      },
      "riderID recipientID accepted"
    );

    return request;
  };

  getAllTransactions = async (ownerID: string) => {
    const transactions = await this.bookingRepository.getAllByHitsButPopulated({
      $and: [{ riderID: ownerID }, { status: "done" }],
    });

    return transactions;
  };

  getAllUserTransactions = async (ownerID: string) => {
    const transactions = await this.bookingRepository.getAllByHitsButPopulatedRider({
      $and: [{ recipientID: ownerID }, { status: "done" }],
    });

    return transactions;
  };
}

export default BookingService;

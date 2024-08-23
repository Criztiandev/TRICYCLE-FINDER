import { FilterQuery } from "mongoose";
import { IBookingRequest } from "../booking.interface";
import BookingRepository from "../repository/booking.repository";
import BookingRequestRepository from "../repository/booking-request.repository";

class BookingService {
  private bookingRepository: BookingRepository;
  private bookingRequestRepository: BookingRequestRepository;

  constructor() {
    this.bookingRepository = new BookingRepository();
    this.bookingRequestRepository = new BookingRequestRepository();
  }

  // new

  public getDetails = async (bookingID: string) => {
    return await this.bookingRepository.findByHits({ _id: bookingID });
  };

  public getActiveBooking = async (ownerID: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today

    const request = await this.bookingRequestRepository.getOneByHits(
      {
        $and: [
          { recipientID: ownerID },
          { status: "accepted" },
          {
            createdAt: {
              $gte: today,
              $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
            },
          },
        ],
      },
      "riderID accepted"
    );

    return request;
  };
}

export default BookingService;

import { IBooking, IBookingRequest } from "../booking.interface";
import BookingRepository from "../repository/booking.repository";

class BookingService {
  private bookingRepository: BookingRepository;
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

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
}

export default BookingService;

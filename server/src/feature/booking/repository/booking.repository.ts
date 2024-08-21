import { FilterQuery } from "mongoose";
import { IBooking } from "../booking.interface";
import bookingModel from "../model/booking.model";

class BookingRepository {
  private model: typeof bookingModel;
  constructor() {
    this.model = bookingModel;
  }

  public getBookingDetailsByHits = () => {};

  public create = async (payload: IBooking) => {
    return await this.model.create(payload);
  };

  public deleteByHits = async (hits: FilterQuery<IBooking>) => {
    return this.model.deleteOne(hits).lean();
  };
}

export default BookingRepository;

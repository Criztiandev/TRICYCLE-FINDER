import { FilterQuery } from "mongoose";
import { IBooking } from "../booking.interface";
import bookingModel from "../model/booking.model";

class BookingRepository {
  private model: typeof bookingModel;
  constructor() {
    this.model = bookingModel;
  }

  public getBookingDetailsByHits = (
    hits: FilterQuery<IBooking>,
    select?: string
  ) => {
    return this.model
      .findOne(hits)
      .select(select || "")
      .lean();
  };

  public create = async (payload: IBooking) => {
    return await this.model.create(payload);
  };

  public deleteByHits = async (hits: FilterQuery<IBooking>) => {
    return this.model.deleteOne(hits).lean();
  };

  public updateByHits = async (
    hits: FilterQuery<IBooking>,
    payload: IBooking["status"]
  ) => {
    return this.model.updateOne(hits, payload, { new: true }).lean();
  };
}

export default BookingRepository;

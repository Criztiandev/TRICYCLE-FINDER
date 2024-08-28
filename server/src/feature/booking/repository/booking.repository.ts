import { FilterQuery } from "mongoose";
import { IBooking } from "../booking.interface";
import bookingModel from "../model/booking.model";

class BookingRepository {
  private model: typeof bookingModel;
  constructor() {
    this.model = bookingModel;
  }

  public findByHits = (hits: FilterQuery<IBooking>, select?: string) => {
    return this.model
      .findOne(hits)
      .select(select || "")
      .lean();
  };

  public getBookingDetailsByHits = (
    hits: FilterQuery<IBooking>,
    select?: string
  ) => {
    return this.model
      .findOne(hits)
      .select(select || "")
      .lean();
  };

  public getAllByHits = async (
    hits: FilterQuery<IBooking>,
    select?: string
  ) => {
    return this.model
      .find(hits)
      .lean()
      .select(select || "")
      .populate({
        path: "recipientID",
        select: "firstName lastName phoneNumber email",
      });
  };

  public getAllByHitsButPopulated = async (
    hits: FilterQuery<IBooking>,
    select?: string
  ) => {
    return this.model
      .find(hits)
      .lean()
      .select(select || "")
      .populate({
        path: "recipientID",
        select: "firstName lastName phoneNumber email",
      });
  };

  public getAllByHitsButPopulatedRider = async (
    hits: FilterQuery<IBooking>,
    select?: string
  ) => {
    return this.model
      .find(hits)
      .lean()
      .select(select || "")
      .populate({
        path: "riderID",
        select: "firstName lastName phoneNumber email",
      });
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
    return this.model.findOneAndUpdate(hits, payload, { new: true }).lean();
  };
}

export default BookingRepository;

import { FilterQuery } from "mongoose";
import bookingRequestModel from "../model/booking-request.model";
import { IBookingRequest } from "../booking.interface";

class BookingRequestRepository {
  private model: typeof bookingRequestModel;
  constructor() {
    this.model = bookingRequestModel;
  }

  public fetchBookingRequestByHits = (
    hits: FilterQuery<IBookingRequest>,
    select?: string
  ) => {
    return this.model
      .findOne(hits)
      .lean()
      .select(select || "");
  };

  /**
   * This functon get all the request
   * @param hits - his are the filter that we are looking for
   * @param select - select are the fields that we want to response
   * @returns Array of booking details
   */
  public fetchAllBookingRequestByHits = (
    hits: FilterQuery<IBookingRequest>,
    select?: string
  ) => {
    return this.model.find(hits).lean().populate({
      path: "recipientID",
      select: "firstName lastName phoneNumber",
    });
  };

  /**
   * This function get the booking request by hits of the provided value
   * @param hits - hits are the filter that we are looking for
   * @param select - select are the fields that we want from the response
   * @returns Booking request details that is manipulated by select
   */

  public fetchBookingRequestDetailsByHits = (
    hits: FilterQuery<IBookingRequest>,
    select?: string
  ) => {
    return this.model
      .findOne(hits)
      .lean()
      .select(select || "");
  };

  /**
   * This function creates a booking request
   * @param payload Payload of the booking request
   * @returns ID of the successful created request
   */

  public deleteRequestById = async (id: string) => {
    const credentials = await this.model.findOneAndDelete<IBookingRequest>({
      $or: [{ _id: id }, { senderID: id }, { recipientID: id }],
    });
    if (!credentials) throw new Error("Request deletion failed");
    return credentials._id;
  };

  // New

  public getOneByHits = async (
    hits: FilterQuery<IBookingRequest>,
    select?: string
  ) => {
    return await this.model
      .findOne(hits)
      .lean()
      .select(select || {});
  };

  public getAllByHits = async (
    hits: FilterQuery<IBookingRequest>,
    select?: string
  ) => {
    return this.model
      .find(hits)
      .lean()
      .select(select || "");
  };

  public create = async (payload: IBookingRequest) => {
    const credentials = await this.model.create(payload);
    return credentials?._id;
  };

  public updateByHits = async (
    hits: FilterQuery<IBookingRequest>,
    payload: Partial<IBookingRequest>
  ) => {
    return await this.model.findOneAndUpdate(hits, payload, {
      new: true,
    });
  };

  public deleteByHits = async (hits: FilterQuery<IBookingRequest>) => {
    return await this.model.deleteOne(hits).lean();
  };
}

export default BookingRequestRepository;

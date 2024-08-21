import { FilterQuery } from "mongoose";
import bookingRequestModel from "../model/booking-request.model";
import { IBookingRequest } from "../booking.interface";

class BookingRequestRepository {
  private model: typeof bookingRequestModel;
  constructor() {
    this.model = bookingRequestModel;
  }

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
    return this.model
      .find(hits)
      .lean()
      .select(select || "")
      .populate({
        path: "senderID",
        select: "firstName lastName",
      })
      .populate({
        path: "recipientID",
        select: "firstName lastName",
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
  public create = async (payload: IBookingRequest) => {
    const credentials = await this.model.create(payload);

    if (!credentials) throw new Error("Booking request failed");
    return credentials?._id;
  };

  public updateRequestById = async (
    hits: FilterQuery<IBookingRequest>,
    payload: Partial<IBookingRequest>
  ) => {
    const updatedCredentials = await this.model.updateOne(hits, payload, {
      new: true,
    });

    if (!updatedCredentials) throw new Error("Update Failed");

    return updatedCredentials.acknowledged;
  };
}

export default BookingRequestRepository;

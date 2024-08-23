import { ObjectId } from "mongoose";

// BookingRequestInterface.ts
export interface IBookingRequest {
  _id?: string;
  senderID: string;
  recipientID: string;
  status?: "pending" | "accepted" | "rejected " | "all";
  isDeleted?: boolean;
}

// BookingInterface.ts
export interface IBooking {
  _id?: string;
  bookingRequestID: string | ObjectId;
  pickupLocation: string;
  dropoffLocation: string;
  status?: any;
}

export interface IBookingRequestBody
  extends Pick<IBooking, "pickupLocation" | "dropoffLocation"> {
  riderID: string;
}

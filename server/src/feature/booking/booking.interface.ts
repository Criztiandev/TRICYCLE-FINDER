import { ObjectId } from "mongoose";

// BookingRequestInterface.ts
export interface IBookingRequest {
  _id?: string;
  bookingID: any;
  riderID: string | ObjectId;
  recipientID: string | ObjectId;
  status?: "pending" | "accepted" | "rejected " | "all";
  isDeleted?: boolean;
}

// BookingInterface.ts
export interface IBooking {
  _id?: string;
  riderID: string | ObjectId;
  recipientID: string | ObjectId;
  pickupLocation: string;
  dropoffLocation: string;
  status?: any;
}

export interface IBookingRequestBody
  extends Pick<IBooking, "pickupLocation" | "dropoffLocation"> {
  riderID: string;
}

export interface ICreateBooking {
  senderID: string;
  riderID: string;
  payload: Pick<IBooking, "dropoffLocation" | "pickupLocation">;
}

export interface ICancelBooking {
  bookingID: any;
  senderID: string;
  riderID: any;
}

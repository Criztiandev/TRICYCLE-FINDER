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
  bookingRequestID: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupTime: Date;
  distance: number;
  fare: number;
}

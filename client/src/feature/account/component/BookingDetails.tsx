// import { View, Text } from "react-native";
// import React, { FC } from "react";
// import XStack from "@/common/components/stacks/XStack";
// import Button from "@/common/components/ui/Button";
// import { MessageSquare } from "lucide-react-native";
// import useCreateConversation from "@/feature/conversation/hooks/useCreateConversation";
// import ProfileDetails from "./ProfileDetails";
// import { IAccount } from "../interface/account.interface";
// import useAcceptRequest from "@/feature/booking/hooks/useAcceptRequest";
// import { useRouter } from "expo-router";
// import useBookingDetails from "@/feature/booking/hooks/useBookingDetailsThruRequest";
// import LoadingScreen from "@/layout/screen/LoadingScreen";
// import ErrorScreen from "@/layout/screen/ErrorScreen";

// interface Props extends IAccount {
//   status?: string;
//   bookingStatus?: string;
// }

// const BookingDetails: FC<Props> = ({ _id, status, ...props }) => {
//   const { isLoading, isError, data } = useBookingDetails(_id as string);

//   if (isLoading) return <LoadingScreen />;
//   if (isError) return <ErrorScreen />;

//   return (
//     <>
//       <ProfileDetails {...props}>
//         <XStack className="w-full space-x-4">
//           <DoneButton targetID={_id as string} />
//           <MessageButton targetID={_id as string} />
//         </XStack>
//       </ProfileDetails>
//     </>
//   );
// };

// export default BookingDetails;

// interface ButtonProps {
//   targetID: string;
//   status?: string;
// }

// const MessageButton = ({ targetID }: ButtonProps) => {
//   const { mutation } = useCreateConversation(targetID as string);
//   return (
//     <Button
//       className="flex-1 ml-2"
//       variant="outlined"
//       onPress={() => mutation.mutate("")}
//     >
//       <View className="flex-1 flex-row justify-center items-center space-x-2">
//         <MessageSquare color="black" />
//         <Text className="text-base"> Message</Text>
//       </View>
//     </Button>
//   );
// };

// const DoneButton = ({ targetID, status }: ButtonProps) => {
//   const router = useRouter();
//   const { mutation } = useAcceptRequest(targetID as string);

//   if (mutation.isSuccess) {
//     router.replace(`/rider/booking/details/${targetID}`);
//   }
//   return (
//     <>
//       <Button className="flex-1 mr-2" onPress={() => mutation.mutate("")}>
//         Done
//       </Button>
//     </>
//   );
// };

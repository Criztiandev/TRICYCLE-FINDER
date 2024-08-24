import React, { useState } from "react";
import InputField from "@/common/components/form/InputField";
import { Eye } from "lucide-react-native";

const AccountInfoStep = () => {
  const [isShowPassword, setIsShowPassword] = useState(true);
  return (
    <>
      <InputField
        type="email"
        label="Email"
        name="email"
        placeholder="Enter your email"
      />

      <InputField
        type="tel"
        label="Contact"
        name="phoneNumber"
        placeholder="Enter your Phone Number"
      />

      <InputField
        type="password"
        label="Password"
        name="password"
        placeholder="Enter your password"
        dir="right"
        icon={<Eye color="black" opacity={isShowPassword ? 0.5 : 1} />}
        onPressIcon={() => setIsShowPassword((prev) => !prev)}
      />
    </>
  );
};

export default AccountInfoStep;

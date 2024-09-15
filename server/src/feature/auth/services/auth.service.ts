import EncryptionUtils from "../../../utils/encryption.utils";
import tokenUtils from "../../../utils/token.utils";
import { IAccount } from "../../account/interface/accounter.interface";
import AccountService from "../../account/services/account.service";

class AuthService {
  private accountService: AccountService;
  constructor() {
    this.accountService = new AccountService();
  }

  public registerUser = async (payload: IAccount) => {
    const { email, password } = payload;

    // check if user exist
    const existingUser = await this.accountService.isAccountExist({ email });
    if (existingUser) {
      throw new Error("User is already exist");
    }

    const hashedPassword = await EncryptionUtils.hashPassword(password);

    return await this.accountService.createUser({
      ...payload,
      password: hashedPassword,
    });
  };

  public loginUser = async (email: string, password: string) => {
    // check if user doesnt exist
    const existingUser = await this.accountService.isAccountExist(
      {
        $or: [{ email }, { phoneNumber: email }],
      },
      "password role"
    );

    if (!existingUser) throw new Error("Account doe'st exist");

    const isPasswordCorrect = await EncryptionUtils.comparePassword(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      throw new Error("Incorrect Password, Please try again later");

    const preparedPayload = { UID: existingUser._id, role: existingUser.role };

    const accessToken = tokenUtils.generateToken<any>(
      preparedPayload,
      process.env.ACCESS_TOKEN_EXPIRATION || "1h"
    );
    const refreshToken = tokenUtils.generateToken<any>(
      preparedPayload,
      process.env.REFRESH_TOKEN_EXPIRATION || "7d"
    );

    // update the status of the account
    await this.accountService.updateAccountStatus(
      existingUser._id as unknown as string,
      "active"
    );

    return {
      accessToken,
      refreshToken,
      user: preparedPayload,
    };
  };
}

export default AuthService;

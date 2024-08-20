import AccountRepository from "../../account/repository/account.repository";

class AuthRepository {
  accountRepo: AccountRepository;
  constructor() {
    this.accountRepo = new AccountRepository();
  }
}

export default AuthRepository;

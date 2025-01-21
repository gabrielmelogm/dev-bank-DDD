import { User } from "../entities/user";
import { UserRepository } from "../repositories/user.repository";
import { BankAccountService } from "./bank-account.service";

export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly bankAccountService: BankAccountService
  ) { }

  async create(user: { name: string, email: string }) {
    const newUser = new User({
      name: user.name,
      email: user.email
    })

    const createdUser = await this.userRepo.create(newUser)

    await this.bankAccountService.create(this.bankAccountService.generateAccountNumber(), createdUser)

    return createdUser
  }
}
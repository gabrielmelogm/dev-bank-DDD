import { User } from "../entities/user";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  constructor(private readonly userRepo: UserRepository) { }

  async create(user: { name: string, email: string }) {
    const newUser = new User({
      name: user.name,
      email: user.email
    })

    const createdUser = await this.userRepo.create(newUser)
    return createdUser
  }
}
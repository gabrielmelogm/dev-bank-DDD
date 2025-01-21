import { Repository } from "typeorm";
import { UserRepository } from "../../../../@core/domain/repositories/user.repository";
import { UserSchema } from "../schemas/user.schema";
import { User } from "src/@core/domain/entities/user";

export class UserTypeOrmRepository implements UserRepository {
  constructor(
    private readonly ormRepo: Repository<UserSchema>
  ) { }

  async create(user: User): Promise<User> {
    const model = this.ormRepo.create(user)
    const createdUser = await this.ormRepo.save(model)
    const instancedUser = new User(createdUser)
    return instancedUser
  }
}
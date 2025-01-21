import { DataSource, Repository } from "typeorm"
import { UserSchema } from "../schemas/user.schema"
import { UserTypeOrmRepository } from "./user-typeorm.repository"
import { User } from "../../../../@core/domain/entities/user"

describe('UserTypeOrmRepository Test', () => {
  let dataSource: DataSource
  let ormRepo: Repository<UserSchema>
  let repository: UserTypeOrmRepository

  beforeEach(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [UserSchema]
    })
    await dataSource.initialize()
    ormRepo = dataSource.getRepository(UserSchema)
    repository = new UserTypeOrmRepository(ormRepo)
  })

  it('should insert a new user', async () => {
    const user = new User({
      id: '123',
      name: 'John Doe',
      email: 'john@mail.com'
    })

    const createdUser = await repository.create(user)
    expect(createdUser).toHaveProperty('id')
    expect(createdUser).toBeInstanceOf(User)
  })
})
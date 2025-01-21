import { UserTypeOrmRepository } from "../../../@core/infra/db/implements/user-typeorm.repository"
import { UserSchema } from "../../../@core/infra/db/schemas/user.schema"
import { DataSource, Repository } from "typeorm"
import { UserService } from "./user.service"

describe('UserService Test', () => {
  let dataSource: DataSource
  let ormRepo: Repository<UserSchema>
  let repository: UserTypeOrmRepository
  let userService: UserService

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
    userService = new UserService(repository)
  })

  it('should create a new user', async () => {
    const model = await userService.create({
      name: 'John Doe',
      email: 'john@mail.com'
    })

    expect(model.name).toBe('John Doe')
    expect(model.email).toBe('john@mail.com')
  })
})
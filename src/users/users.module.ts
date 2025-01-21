import { Module } from "@nestjs/common";
import { getDataSourceToken, TypeOrmModule } from "@nestjs/typeorm";
import { UserSchema } from "../@core/infra/db/schemas/user.schema";
import { UsersController } from "./users.controller";
import { UserTypeOrmRepository } from "../@core/infra/db/implements/user-typeorm.repository";
import { DataSource } from "typeorm";
import { UserService } from "../@core/domain/services/user.service";
import { UserRepository } from "../@core/domain/repositories/user.repository";

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [UsersController],
  providers: [
    {
      provide: UserTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new UserTypeOrmRepository(
          dataSource.getRepository(UserSchema)
        )
      },
      inject: [getDataSourceToken()]
    },
    {
      provide: UserService,
      useFactory: (repo: UserRepository) => {
        return new UserService(repo)
      },
      inject: [UserTypeOrmRepository]
    }
  ]
})

export class UsersModule { }
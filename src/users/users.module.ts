import { Module } from "@nestjs/common";
import { getDataSourceToken, TypeOrmModule } from "@nestjs/typeorm";
import { UserSchema } from "../@core/infra/db/schemas/user.schema";
import { UsersController } from "./users.controller";
import { UserTypeOrmRepository } from "../@core/infra/db/implements/user-typeorm.repository";
import { DataSource } from "typeorm";
import { UserService } from "../@core/domain/services/user.service";
import { UserRepository } from "../@core/domain/repositories/user.repository";
import { BankAccountService } from "../@core/domain/services/bank-account.service";
import { BankAccountsModule } from "../bank-accounts/bank-accounts.module";

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema]), BankAccountsModule],
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
      useFactory: (repo: UserRepository, bankAccountService: BankAccountService) => {
        return new UserService(repo, bankAccountService)
      },
      inject: [UserTypeOrmRepository, BankAccountService]
    }
  ]
})

export class UsersModule { }
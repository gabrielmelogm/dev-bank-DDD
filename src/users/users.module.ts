import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from '../@core/infra/db/schemas/user.schema';
import { UsersController } from './users.controller';
import { UserTypeOrmRepository } from '../@core/infra/db/implements/user-typeorm.repository';
import { DataSource } from 'typeorm';
import { UserRepository } from '../@core/domain/repositories/user.repository';
import { BankAccountsModule } from '../bank-accounts/bank-accounts.module';
import { CreateUserWithBankAccountUseCase } from 'src/@core/domain/use-cases/user/create-user-with-bank-account.usecase';
import { CreateBankAccountUseCase } from 'src/@core/domain/use-cases/bank-account/create-bank-account.usecase';
import { BankAccountTypeOrmRepository } from 'src/@core/infra/db/implements/bank-account-typeorm.repository';
import { BankAccountSchema } from 'src/@core/infra/db/schemas/bank-account.schema';
import { BankAccountRepository } from 'src/@core/domain/repositories/bank-account.repository';
import { GenerateBankAccountNumberUseCase } from 'src/@core/domain/use-cases/bank-account/generate-bank-account-number.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema]), BankAccountsModule],
  controllers: [UsersController],
  providers: [
    {
      provide: UserTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new UserTypeOrmRepository(dataSource.getRepository(UserSchema));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: BankAccountTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new BankAccountTypeOrmRepository(
          dataSource.getRepository(BankAccountSchema),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: CreateUserWithBankAccountUseCase,
      useFactory: (
        repo: UserRepository,
        bankAccountRepo: BankAccountRepository,
      ) => {
        return new CreateUserWithBankAccountUseCase(
          repo,
          new CreateBankAccountUseCase(bankAccountRepo),
          new GenerateBankAccountNumberUseCase(),
        );
      },
      inject: [UserTypeOrmRepository, BankAccountTypeOrmRepository],
    },
  ],
})
export class UsersModule {}

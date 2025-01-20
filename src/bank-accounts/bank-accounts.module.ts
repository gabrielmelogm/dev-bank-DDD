import { Module } from '@nestjs/common';
import { BankAccountsController } from './bank-accounts.controller';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountSchema } from '../@core/infra/db/schemas/bank-account.schema';
import { BankAccountTypeOrmRepository } from '../@core/infra/db/implements/bank-account-typeorm.repository';
import { DataSource } from 'typeorm';
import { BankAccountService } from '../@core/domain/services/bank-account.service';
import { BankAccountRepository } from 'src/@core/domain/repositories/bank-account.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccountSchema])],
  controllers: [BankAccountsController],
  providers: [
    {
      provide: BankAccountTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new BankAccountTypeOrmRepository(
          dataSource.getRepository(BankAccountSchema)
        )
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: BankAccountService,
      useFactory: (repo: BankAccountRepository) => {
        return new BankAccountService(repo)
      },
      inject: [BankAccountTypeOrmRepository]
    }
  ],
})
export class BankAccountsModule { }

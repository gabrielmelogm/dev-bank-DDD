import { Module } from '@nestjs/common';
import { BankAccountsController } from './bank-accounts.controller';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountSchema } from '../@core/infra/db/schemas/bank-account.schema';
import { BankAccountTypeOrmRepository } from '../@core/infra/db/implements/bank-account-typeorm.repository';
import { DataSource } from 'typeorm';
import { BankAccountRepository } from 'src/@core/domain/repositories/bank-account.repository';
import { FindAllBankAccounts } from 'src/@core/domain/use-cases/bank-account/find-all-bank-accounts.usecase';
import { FindOneBankAccountById } from 'src/@core/domain/use-cases/bank-account/find-one-bank-account-by-id.usecase';
import { TransferEntryBankAccountsUseCase } from 'src/@core/domain/use-cases/bank-account/transfer-entry-bank-accounts.usecase';
import { TransferAmountEntryAccountsUseCase } from 'src/@core/domain/use-cases/transfer/transfer-amount-entry-accounts.usecase';
import { FindBankAccountByAccountNumberUseCase } from 'src/@core/domain/use-cases/bank-account/find-bank-account-by-account-number.usecase';
import { UpdateBalanceBankAccountUseCase } from 'src/@core/domain/use-cases/bank-account/update-balance-bank-account.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccountSchema])],
  controllers: [BankAccountsController],
  providers: [
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
      provide: FindAllBankAccounts,
      useFactory: (repo: BankAccountRepository) => {
        return new FindAllBankAccounts(repo);
      },
      inject: [BankAccountTypeOrmRepository],
    },
    {
      provide: FindOneBankAccountById,
      useFactory: (repo: BankAccountRepository) => {
        return new FindOneBankAccountById(repo);
      },
      inject: [BankAccountTypeOrmRepository],
    },
    {
      provide: TransferAmountEntryAccountsUseCase,
      useFactory: () => new TransferAmountEntryAccountsUseCase(),
    },
    {
      provide: TransferEntryBankAccountsUseCase,
      useFactory: (repo: BankAccountRepository) => {
        return new TransferEntryBankAccountsUseCase(
          new TransferAmountEntryAccountsUseCase(),
          new FindBankAccountByAccountNumberUseCase(repo),
          new UpdateBalanceBankAccountUseCase(
            repo,
            new FindBankAccountByAccountNumberUseCase(repo),
          ),
        );
      },
      inject: [BankAccountTypeOrmRepository],
    },
  ],
})
export class BankAccountsModule {}

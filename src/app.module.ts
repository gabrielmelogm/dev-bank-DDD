import { Module } from '@nestjs/common';
import { BankAccountsModule } from './bank-accounts/bank-accounts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountSchema } from './@core/infra/db/schemas/bank-account.schema';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: __dirname + '/db.sqlite',
      synchronize: true,
      logging: true,
      entities: [BankAccountSchema],
    }),
    BankAccountsModule,
  ],
})
export class AppModule { }


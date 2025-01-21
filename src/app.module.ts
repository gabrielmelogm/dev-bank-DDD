import { Module } from '@nestjs/common';
import { BankAccountsModule } from './bank-accounts/bank-accounts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountSchema } from './@core/infra/db/schemas/bank-account.schema';
import { UserSchema } from './@core/infra/db/schemas/user.schema';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: __dirname + '/db.sqlite',
      synchronize: true,
      logging: true,
      entities: [BankAccountSchema, UserSchema],
    }),
    BankAccountsModule,
    UsersModule
  ],
})
export class AppModule { }


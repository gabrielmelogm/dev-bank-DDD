import { Module } from '@nestjs/common';
import { BankAccountsModule } from './bank-accounts/bank-accounts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { HealthCheckController } from './health-check.controller';
import { sqliteTypeOrmConnectionConfig } from './@core/infra/db/config/providers/sqlite-typeorm-connection.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(sqliteTypeOrmConnectionConfig),
    BankAccountsModule,
    UsersModule,
  ],
  controllers: [HealthCheckController],
})
export class AppModule {}

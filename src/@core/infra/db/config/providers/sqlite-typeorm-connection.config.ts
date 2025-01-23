import { BankAccountSchema } from '../../schemas/bank-account.schema';
import { UserSchema } from '../../schemas/user.schema';
import { ITypeOrmConnectionConfig } from '../typeorm-connection.config';

export const sqliteTypeOrmConnectionConfig: ITypeOrmConnectionConfig = {
  type: 'sqlite',
  database: __dirname + '/db.sqlite',
  synchronize: true,
  logging: false,
  entities: [BankAccountSchema, UserSchema],
};

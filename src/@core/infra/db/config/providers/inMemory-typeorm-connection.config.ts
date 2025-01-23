import { BankAccountSchema } from '../../schemas/bank-account.schema';
import { UserSchema } from '../../schemas/user.schema';
import { ITypeOrmConnectionConfig } from '../typeorm-connection.config';

export const inMemoryTypeOrmConnectionConfig: ITypeOrmConnectionConfig = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  logging: false,
  entities: [BankAccountSchema, UserSchema],
};

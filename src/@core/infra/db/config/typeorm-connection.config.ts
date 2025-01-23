import { EntitySchema, MixedList } from 'typeorm';
import { Type } from '@nestjs/common';

export interface ITypeOrmConnectionConfig {
  type: 'sqlite' | 'postgres';
  database: string;
  synchronize: boolean;
  logging: boolean;
  entities?: MixedList<string | Type<any> | EntitySchema<any>>;
}

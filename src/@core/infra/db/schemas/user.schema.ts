import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;
}
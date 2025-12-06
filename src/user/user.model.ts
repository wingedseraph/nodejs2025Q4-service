import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4
  @Column()
  login: string;
  @Column()
  password: string;
  @Column({ type: 'integer', default: 1 })
  version: number; // integer number, increments on update
  @Column({ type: 'integer' })
  createdAt: Date; // timestamp of creation
  @Column({ type: 'int' })
  updatedAt: Date; // timestamp of last update
}

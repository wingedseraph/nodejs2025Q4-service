import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date; // timestamp of creation
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date; // timestamp of last update
}

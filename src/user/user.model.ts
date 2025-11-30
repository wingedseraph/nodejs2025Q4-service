import { randomUUID } from 'node:crypto';

export class UserModel {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update

  constructor(login: string, password: string) {
    const timestamp = Date.now();

    this.id = randomUUID();
    this.login = login;
    this.password = password;
    this.version = 1;
    this.createdAt = timestamp;
    this.updatedAt = timestamp;
  }
}

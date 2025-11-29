import { Injectable } from '@nestjs/common';
import { checkOldPassword, checkRecordExists } from '../utils/checks';
import { CreateUser } from './types/create-user.types';
import { UpdateUser } from './types/update-user.types';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  private readonly users = new Map<string, UserModel>();

  private userWithoutPassword(user: UserModel) {
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  findAll() {
    return Array.from(this.users.values()).map(this.userWithoutPassword);
  }

  findById(id: string) {
    const user = this.users.get(id);

    checkRecordExists(user);

    return this.userWithoutPassword(user);
  }

  createUser(createUser: CreateUser) {
    const newUser = new UserModel(createUser.login, createUser.password);
    this.users.set(newUser.id, newUser);

    return this.userWithoutPassword(newUser);
  }

  updatePassword(id: string, updatePassword: UpdateUser) {
    const user = this.users.get(id);

    checkRecordExists(user);
    checkOldPassword(user.password, updatePassword.oldPassword);

    user.password = updatePassword.newPassword;
    user.version++;
    user.updatedAt = Date.now();

    this.users.set(id, user);

    return this.userWithoutPassword(user);
  }

  deleteUser(id: string) {
    const user = this.users.get(id);

    checkRecordExists(user);

    return this.users.delete(id);
  }
}

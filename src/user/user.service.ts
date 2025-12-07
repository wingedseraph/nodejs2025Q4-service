import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { checkOldPassword, checkRecordExistsById } from '../utils/checks';
import { CreateUser } from './types/create-user.types';
import { UpdateUser } from './types/update-user.types';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private userRepository: Repository<UserModel>,
  ) {}

  private userWithoutPassword(user: UserModel) {
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users.map(this.userWithoutPassword);
  }

  async findById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    checkRecordExistsById(user, id);

    return this.userWithoutPassword(user);
  }

  async createUser(createUser: CreateUser) {
    const newUser = this.userRepository.create(createUser);
    const createdUser = await this.userRepository.save(newUser);

    return this.userWithoutPassword(createdUser);
  }

  async updatePassword(id: string, updatePassword: UpdateUser) {
    const user = await this.userRepository.findOne({ where: { id } });

    checkRecordExistsById(user, id);
    checkOldPassword(user.password, updatePassword.oldPassword);

    user.password = updatePassword.newPassword;
    user.version = user.version + 1;
    user.updatedAt = new Date();

    const updatedUser = await this.userRepository.save(user);

    return this.userWithoutPassword(updatedUser);
  }

  async deleteUser(id: string) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return true;
  }
}

import { Module } from '@nestjs/common';
import { UserModelController } from './user.model.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserModelController],
  providers: [UserService],
})
export class UserModule {}

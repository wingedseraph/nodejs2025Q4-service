import { Module } from '@nestjs/common';
import { UserModelController } from './user.model.controller';
import { UserService } from './user.service';

// what should import/export/used
@Module({
  controllers: [UserModelController],
  providers: [UserService],
})
export class UserModule {}

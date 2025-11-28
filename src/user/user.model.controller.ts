import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

// which logic should call on endpoint/method
@Controller('user')
export class UserModelController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }
}

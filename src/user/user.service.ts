import { Injectable } from '@nestjs/common';

// there we implement logic of our endpoint
@Injectable()
export class UserService {
  getHello(): string {
    return 'Hello World from user!';
  }
}

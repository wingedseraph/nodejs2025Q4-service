import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import type { StringValue } from 'ms';
import { UserService } from '../user/user.service';
import { LoginDto } from './types/login.types';
import { RefreshDto } from './types/refresh.types';
import { SignupDto } from './types/signup.types';

type JwtConfig = {
  accessSecret: string;
  accessExpiration: StringValue;
  refreshSecret: string;
  refreshExpiration: StringValue;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject('JWT_CONFIG') private readonly jwtConfig: JwtConfig,
  ) {}

  async signup(signupDto: SignupDto) {
    const existingUser = await this.userService.findByLogin(signupDto.login);
    // checkRecordExistsById(existingUser, signupDto.login);
    if (existingUser) {
      throw new BadRequestException('User with this login already exists');
    }

    const user = await this.userService.createUser({
      login: signupDto.login,
      password: signupDto.password,
    });

    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByLogin(loginDto.login);

    if (!user) {
      throw new ForbiddenException('Invalid login or password');
    }
    const isPasswordValid = await compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid login or password');
    }
    // await comparePasswords(user.password, loginDto.password);

    const payload = { userId: user.id, login: user.login };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = sign(payload, this.jwtConfig.refreshSecret, {
      expiresIn: this.jwtConfig.refreshExpiration,
    });

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: RefreshDto) {
    if (!refreshToken.refreshToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }

    try {
      const payload = verify(
        refreshToken.refreshToken,
        this.jwtConfig.refreshSecret,
      ) as JwtPayload;

      const newPayload = { userId: payload.userId, login: payload.login };
      const accessToken = this.jwtService.sign(newPayload);
      const newRefreshToken = sign(newPayload, this.jwtConfig.refreshSecret, {
        expiresIn: this.jwtConfig.refreshExpiration,
      });

      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new ForbiddenException('Invalid refresh token');
    }
  }
}

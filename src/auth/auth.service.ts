import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import type { StringValue } from 'ms';
import { AUTH_ERRORS, USER_ERRORS } from '../const/messages';
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
    if (existingUser) {
      throw new BadRequestException(USER_ERRORS.LOGIN_ALREADY_EXISTS_ERROR);
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
      throw new ForbiddenException(USER_ERRORS.NOT_FOUND_ERROR);
    }
    const isPasswordValid = await compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new ForbiddenException(USER_ERRORS.PASSWORD_WRONG_ERROR);
    }

    const payload = { userId: user.id, login: user.login };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.refreshSecret,
      expiresIn: this.jwtConfig.refreshExpiration,
    });

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: RefreshDto) {
    if (!refreshToken.refreshToken) {
      throw new UnauthorizedException(AUTH_ERRORS.REFRESH_TOKEN_MISSING);
    }

    try {
      const payload = this.jwtService.verify<{ userId: string; login: string }>(
        refreshToken.refreshToken,
        { secret: this.jwtConfig.refreshSecret },
      );

      const newPayload = { userId: payload.userId, login: payload.login };
      const accessToken = await this.jwtService.signAsync(newPayload);
      const newRefreshToken = await this.jwtService.signAsync(newPayload, {
        secret: this.jwtConfig.refreshSecret,
        expiresIn: this.jwtConfig.refreshExpiration,
      });

      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new ForbiddenException(AUTH_ERRORS.REFRESH_TOKEN_INVALID);
    }
  }
}

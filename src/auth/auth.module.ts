import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import type { StringValue } from 'ms';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

export const JWT_CONFIG = {
  accessSecret: process.env.JWT_SECRET_KEY || '',
  accessExpiration: (process.env.JWT_ACCESS_TOKEN_EXPIRATION ||
    '1h') as StringValue,
  refreshSecret: process.env.JWT_SECRET_REFRESH_KEY || '',
  refreshExpiration: (process.env.JWT_REFRESH_TOKEN_EXPIRATION ||
    '24h') as StringValue,
};

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: JWT_CONFIG.accessSecret,
      signOptions: { expiresIn: JWT_CONFIG.accessExpiration },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'JWT_CONFIG',
      useValue: JWT_CONFIG,
    },
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import type { StringValue } from 'ms';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';

const jwtConfig = {
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
      secret: jwtConfig.accessSecret,
      signOptions: { expiresIn: jwtConfig.accessExpiration },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: 'JWT_CONFIG',
      useValue: jwtConfig,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}

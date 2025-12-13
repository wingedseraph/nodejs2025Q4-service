import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AUTH_ERRORS } from '../const/messages';
import { PUBLIC_ROUTES } from '../const/routes';
import { extractTokenFromHeader, verifyJwtToken } from '../utils/checks';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const path = request.url;

    if (path === '/') {
      return true;
    }

    if (PUBLIC_ROUTES.some((route) => path.startsWith(route))) {
      return true;
    }

    const token = extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(AUTH_ERRORS.TOKEN_MISSING);
    }

    await verifyJwtToken(this.jwtService, token);

    return true;
  }
}

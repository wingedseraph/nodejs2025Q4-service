import {
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { Request } from 'express';
import { AUTH_ERRORS, USER_ERRORS } from '../const/messages';

export function checkRecordExistsById<T>(
  entity: T | undefined,
  id: string,
  errorMessage?: string,
) {
  if (!entity) {
    throw new NotFoundException(
      errorMessage ?? `${entity} with id ${id} not found`,
    );
  }
}

export async function comparePasswords(
  actualPassword: string,
  providedPassword: string,
) {
  const isMatch = await compare(providedPassword, actualPassword);

  if (!isMatch) {
    throw new ForbiddenException(USER_ERRORS.OLD_PASSWORD_WRONG_ERROR);
  }
}

export function checkEntityExistsById<T>(
  entity: T | undefined,
  id: string,
  errorMessage?: string,
) {
  if (!entity) {
    throw new UnprocessableEntityException(
      errorMessage ?? `${entity} with id ${id} not found`,
    );
  }
}

export function extractTokenFromHeader(request: Request) {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}

export async function verifyJwtToken(jwtService: JwtService, token: string) {
  try {
    await jwtService.verifyAsync(token);
  } catch (error) {
    throw new UnauthorizedException(AUTH_ERRORS.TOKEN_INVALID);
  }
}

import {
  ForbiddenException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { USER_ERRORS } from '../const/messages';

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

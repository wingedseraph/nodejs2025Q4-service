import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { USER_ERRORS } from '../const/messages';

export function checkRecordExists<T>(
  record: T | undefined,
  errorMessage = USER_ERRORS.NOT_FOUND_ERROR,
): asserts record is T {
  if (!record) {
    throw new NotFoundException(errorMessage);
  }
}

export function checkOldPassword(
  actualPassword: string,
  providedPassword: string,
  errorMessage = USER_ERRORS.OLD_PASSWORD_WRONG_ERROR,
): void {
  if (actualPassword !== providedPassword) {
    throw new ForbiddenException(errorMessage);
  }
}

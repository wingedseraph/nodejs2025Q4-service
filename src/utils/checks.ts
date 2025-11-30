import {
  ForbiddenException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { GENERIC_ERRORS, USER_ERRORS } from '../const/messages';

export function checkUserExists<T>(
  user: T | undefined,
  errorMessage?: string,
): asserts user is T {
  if (!user) {
    throw new NotFoundException(errorMessage ?? USER_ERRORS.NOT_FOUND_ERROR);
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

export function checkTrackExists<T>(
  track: T | undefined,
  errorMessage?: string,
) {
  if (!track) {
    throw new UnprocessableEntityException(
      errorMessage ?? GENERIC_ERRORS.NOT_FOUND_ERROR,
    );
  }
}

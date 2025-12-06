import {
  ForbiddenException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { GENERIC_ERRORS, USER_ERRORS } from '../const/messages';

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

export function checkOldPassword(
  actualPassword: string,
  providedPassword: string,
  errorMessage = USER_ERRORS.OLD_PASSWORD_WRONG_ERROR,
) {
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

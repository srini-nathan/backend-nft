import { enumType } from 'nexus'

export enum ErrorCodesEnum {
  INVITE_USER_FORBIDDEN = 'INVITE_USER_FORBIDDEN',
  USER_DOES_NOT_EXISTS = 'USER_DOES_NOT_EXISTS',
  USER_ROLE_FORBIDDEN = 'USER_ROLE_FORBIDDEN',
  USER_SESSION_INVALID_FORBIDDEN = 'USER_SESSION_INVALID_FORBIDDEN',
  SIGNUP_ERROR = 'SIGNUP_ERROR',
  SIGNUP_FORBIDDEN = 'SIGNUP_FORBIDDEN',
  SIGNUP_TOKEN_EXPIRED = 'SIGNUP_TOKEN_EXPIRED',
  PERSON_NOT_FOUND = 'PERSON_NOT_FOUND',
  FIELD_IS_REQUIRED = 'FIELD_IS_REQUIRED',
  UNAUTHORIZED_TO_CREATE = 'UNAUTHORIZED_TO_CREATE',
  UNAUTHORIZED_TO_DELETE = 'UNAUTHORIZED_TO_DELETE',
  UNAUTHORIZED_TO_READ = 'UNAUTHORIZED_TO_READ',
  UNAUTHORIZED_TO_READ_UPDATE = 'UNAUTHORIZED_TO_READ_UPDATE',
  UNAUTHORIZED_TO_UPDATE = 'UNAUTHORIZED_TO_UPDATE',
  EMAIL_ACCOUNT_ALREADY_EXISTS = 'EMAIL_ACCOUNT_ALREADY_EXISTS',
  EMAIL_NOT_PROVIDED = 'EMAIL_NOT_PROVIDED',
  LOGIN_FAILED_UNAUTHORIZED = 'LOGIN_FAILED_UNAUTHORIZED',
  INVALID_EMAIL_OR_PASSWORD = 'INVALID_EMAIL_OR_PASSWORD',
  INVALID_EMAIL = 'INVALID_EMAIL',
  PASSWORD_CHANGE_FORBIDDEN='PASSWORD_CHANGE_FORBIDDEN',
  INVALID_ACCOUNT_ADDRESS="INVALID_ACCOUNT_ADDRESS"
}

export const ErrorCodes = enumType({
  name: 'ErrorCodes',
  members: Object.keys(ErrorCodesEnum),
})

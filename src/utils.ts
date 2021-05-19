import { sign, TokenExpiredError, verify } from 'jsonwebtoken'
import InternalServerError from './common/errors/InternalServerError'
import UnauthorizedError from './common/errors/UnauthorizedError'
import { Context } from './context'
import { ErrorCodesEnum } from './types/ErrorCodes'

export const APP_SECRET = 'appsecret321'
export const key = 'Authorization'

export interface IToken {
  email: string
  userId: string
  expiresAt: string // this is not Date, because IToken is parsed from JSON
  exp: number
  iat: number
}

export function getAppToken(context: Context) {
  try {
    return verify(getUnverifiedAppToken(context), APP_SECRET) as IToken
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new UnauthorizedError(ErrorCodesEnum.LOGIN_FAILED_UNAUTHORIZED)
    }
    throw error
  }
}

export const getUnverifiedAppToken = (context: Context) => {
  const authHeader = getHeader(context, 'Authorization')
  return authHeader.replace('Bearer ', '')
}

export function getUserId(context: Context) {
  const appToken = getAppToken(context)
  return appToken.userId
}

export const getHeader = (context: Context, key: string) => {
  let headerValue: string
  if (context.req) {
    headerValue = context.req.get(key)
  } else {
    throw new InternalServerError(
      'Authorization token could not be retrieved from incoming request',
    )
  }

  if (headerValue == null || headerValue.length === 0) {
    throw new InternalServerError(`Header '${key}' invalid`)
  }

  return headerValue
}

export interface IAuthenticationResult {
  email: string
  userId: string
}

export function buildAppToken(authResult: IAuthenticationResult) {
  return sign(authResult, APP_SECRET, { expiresIn: '7d' })
}

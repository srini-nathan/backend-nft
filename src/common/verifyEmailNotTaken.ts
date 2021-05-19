import { Context } from '../context'
import { ErrorCodesEnum } from '../types/ErrorCodes'
import { enforceUnset } from './errors/enforce'
import ForbiddenError from './errors/ForbiddenError'

export const verifyEmailNotTaken = async (context: Context, email: string) => {
    
  const existingUser = await context.prisma.user.findUnique({
    where: { email: email },
  })

  enforceUnset(
    existingUser,
    ErrorCodesEnum.EMAIL_ACCOUNT_ALREADY_EXISTS,
    ForbiddenError,
  )
}

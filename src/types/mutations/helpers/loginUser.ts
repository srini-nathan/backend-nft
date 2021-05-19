import { enforceExists } from '../../../common/errors/enforce'
import ForbiddenError from '../../../common/errors/ForbiddenError'
import UnauthorizedError from '../../../common/errors/UnauthorizedError'
import { Context } from '../../../context'
import { buildAppToken, IAuthenticationResult } from '../../../utils'
import { ApiFeedbackEnum } from '../../ApiFeedback'
import { AuthPayload } from '../../AuthPayload'
import { ErrorCodesEnum } from '../../ErrorCodes'

export async function loginUser(
  context: Context,
  email: string,
  password: string,
): Promise<AuthPayload> {
  const user = await context.prisma.user.findMany({
    where: { AND: [{ email }, { password }] },
  })
  enforceExists(user[0], ErrorCodesEnum.USER_DOES_NOT_EXISTS, ForbiddenError)

  const authResult: IAuthenticationResult = { email, userId: user[0]?.id }

  if (!authResult || !authResult.email || !authResult.userId) {
    throw new UnauthorizedError(ErrorCodesEnum.LOGIN_FAILED_UNAUTHORIZED)
  }

  // Wrap everything in our own token
  const appToken = buildAppToken(authResult)

  return {
    token: appToken,
    feedback: ApiFeedbackEnum.SUCCESS,
  }
}

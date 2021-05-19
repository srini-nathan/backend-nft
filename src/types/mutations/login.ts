import { core, nonNull, stringArg } from 'nexus'
import { enforce, enforceExists } from '../../common/errors/enforce'
import ForbiddenError from '../../common/errors/ForbiddenError'
import UnauthorizedError from '../../common/errors/UnauthorizedError'
import { validateEmail } from '../../common/validateEmail'
import { Context } from '../../context'
import { AuthPayload } from '../AuthPayload'
import { ErrorCodesEnum } from '../ErrorCodes'
import { loginUser } from './helpers/loginUser'

interface LoginParams {
  email: string
  password: string
}

export const loginResolver: core.FieldResolver<'Mutation', 'login'> = async (
  _parent: any,
  { email, password }: LoginParams,
  context: Context,
): Promise<AuthPayload> => {
  enforce(
    validateEmail(email.toLocaleLowerCase()),
    ErrorCodesEnum.INVALID_EMAIL_OR_PASSWORD,
    ForbiddenError,
  )

  const user = await context.prisma.user.findUnique({ where: { email } })
  enforceExists(
    user,
    ErrorCodesEnum.LOGIN_FAILED_UNAUTHORIZED,
    UnauthorizedError,
  )

  return await loginUser(context, email, password)
}

export const login: core.NexusOutputFieldConfig<'Mutation', 'login'> = {
  type: 'AuthPayload',
  args: {
    email: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  resolve: loginResolver,
}

import { User } from '.prisma/client'
import { core, idArg, nonNull, stringArg } from 'nexus'
import { enforce, enforceExists } from '../../common/errors/enforce'
import ForbiddenError from '../../common/errors/ForbiddenError'
import InternalServerError from '../../common/errors/InternalServerError'
import { getCurrentTime } from '../../common/getCurrentTime'
import { Context } from '../../context'
import { AuthPayload } from '../AuthPayload'
import { ErrorCodesEnum } from '../ErrorCodes'
import { loginUser } from './helpers/loginUser'

interface InviteUserParams {
  signupToken: string
  password: string
  firstName: string
  lastName: string
}

export const signupResolver: core.FieldResolver<'Mutation', 'signup'> = async (
  _parent: any,
  { signupToken, password, firstName, lastName }: InviteUserParams,
  context: Context,
): Promise<AuthPayload> => {
  //Checking for existing user
  const user = await context.prisma.user.findUnique({ where: { signupToken } })
  enforceExists(user, ErrorCodesEnum.USER_DOES_NOT_EXISTS, ForbiddenError)

  enforceExists(
    user.signupTokenExpiryAt,
    ErrorCodesEnum.SIGNUP_FORBIDDEN,
    ForbiddenError,
  )

  //Checking user token expiry date

  enforce(
    !isTokenExpired(user.signupTokenExpiryAt),
    ErrorCodesEnum.SIGNUP_TOKEN_EXPIRED,
    ForbiddenError,
  )

  // Get Person for user
  const person = await context.prisma.person.findUnique({
    where: { userId: user.id },
  })
  enforceExists(person, ErrorCodesEnum.PERSON_NOT_FOUND)

  // /Updating the user's person basic info
  await context.prisma.person.update({
    data: { firstName, lastName },
    where: { id: person.id },
  })

  const confirmedAt = getCurrentTime()

  await context.prisma.user.update({
    data: { confirmedAt },
    where: { id: user.id },
  })

  return await loginUser(context, user.email, password)
}

export const signup: core.NexusOutputFieldConfig<'Mutation', 'signup'> = {
  type: 'AuthPayload',
  args: {
    signupToken: nonNull(idArg()),
    password: nonNull(stringArg()),
    firstName: nonNull(stringArg()),
    lastName: nonNull(stringArg()),
  },
  resolve: signupResolver,
}

const isTokenExpired = (signupTokenExpiryAt: Date) => {
  let expiryDate: Date
  try {
    expiryDate = new Date(signupTokenExpiryAt)
  } catch (e) {
    throw new InternalServerError(ErrorCodesEnum.SIGNUP_ERROR)
  }
  return expiryDate.getTime() < getCurrentTime().getTime()
}

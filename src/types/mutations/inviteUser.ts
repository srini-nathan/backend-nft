import { User } from '.prisma/client'
import cuid from 'cuid'
import { generate } from 'generate-password'
import { core, nonNull, stringArg } from 'nexus'
import { SIGNUP_TOKEN_EXPIRY } from '../../common/constants'
import DateHelper from '../../common/DateExtensions'
import { enforce, enforceExists } from '../../common/errors/enforce'
import ForbiddenError from '../../common/errors/ForbiddenError'
import NotFoundError from '../../common/errors/NotFoundError'
import { getCurrentTime } from '../../common/getCurrentTime'
import { validateEmail } from '../../common/validateEmail'
import { verifyEmailNotTaken } from '../../common/verifyEmailNotTaken'
import { Context } from '../../context'
import { IApiCall } from '../ApiCall'
import { ApiFeedbackEnum } from '../ApiFeedback'
import { ErrorCodesEnum } from '../ErrorCodes'

interface InviteUserParams {
  email: string
  role: string
}

export const inviteUserResolver: core.FieldResolver<'Mutation', 'inviteUser'> =
  async (
    _parent: any,
    { email, role }: InviteUserParams,
    context: Context,
  ): Promise<IApiCall> => {
    enforce(
      validateEmail(email.toLocaleLowerCase()),
      ErrorCodesEnum.INVALID_EMAIL_OR_PASSWORD,
      ForbiddenError,
    )

    enforceExists(role, ErrorCodesEnum.FIELD_IS_REQUIRED, NotFoundError)

    // Check if email is already registered
    await verifyEmailNotTaken(context, email)

    const randomPassword = generate({
      length: 12,
      numbers: true,
    })

    // Create new user
    const newUser = await context.prisma.user.create({
      data: { email, password: randomPassword },
    })

    // Get Person for user
    await context.prisma.person.create({
      data: {
        user: { connect: { id: newUser.id } },
        firstName: 'firstName',
        lastName: 'lastName',
      },
    })

    await inviteUser(context, email, newUser)

    return { feedback: ApiFeedbackEnum.SUCCESS }
  }

export const inviteUserConfig: core.NexusOutputFieldConfig<
  'Mutation',
  'inviteUser'
> = {
  type: 'ApiCall',
  args: {
    email: nonNull(stringArg()),
    role: nonNull(stringArg()),
  },
  resolve: inviteUserResolver,
}

const inviteUser = async (context: Context, email: string, user: User) => {
  // await sender.sendInviteEmail(email, user.signupToken);
  await context.prisma.user.update({
    data: {
      invitedAt: getCurrentTime(),
      signupToken: cuid(),
      signupTokenExpiryAt: DateHelper.addHours(
        getCurrentTime(),
        SIGNUP_TOKEN_EXPIRY,
      ),
    },
    where: { id: user.id },
  })
}

import cuid from "cuid";
import { core, nonNull, stringArg } from "nexus";
import { TWO_HOURS } from "../../common/constants";
import DateHelper from "../../common/DateExtensions";
import { enforce, enforceExists } from "../../common/errors/enforce";
import ForbiddenError from "../../common/errors/ForbiddenError";
import { getCurrentTime } from "../../common/getCurrentTime";
import { validateEmail } from "../../common/validateEmail";
import { ApiFeedbackEnum } from "../ApiFeedback";
import { ErrorCodesEnum } from "../ErrorCodes";
import bcrypt from 'bcrypt'

interface ResetPasswordParams {
  email: string
  currentPassword: string
  newPassword: string
}

export const resetPasswordResolver: core.FieldResolver<"Mutation", "resetPassword"> = async (
  _parent,
  { email, currentPassword, newPassword }: ResetPasswordParams,
  context
) => {

  enforce(
    validateEmail(email.toLocaleLowerCase()),
    ErrorCodesEnum.INVALID_EMAIL,
    ForbiddenError,
  )



  const existingUser = await context.prisma.user.findUnique({ where: { email } });
  enforceExists(existingUser, ErrorCodesEnum.PASSWORD_CHANGE_FORBIDDEN, ForbiddenError)

  const match = await bcrypt.compare(currentPassword, existingUser.password);
  enforce(match, ErrorCodesEnum.UNAUTHORIZED_TO_UPDATE, ForbiddenError)


  const hashedPassword = await bcrypt.hash(newPassword, 10);


  const user = await context.prisma.user.update({
    data: {
      password: hashedPassword,
      resetToken: cuid(),
      resetTokenExpiryAt: DateHelper.addHours(
        getCurrentTime(),
        TWO_HOURS,
      )
    },
    where: {
      email: email
    }
  });

  //logger.debug("Sending password reset");


  return { feedback: ApiFeedbackEnum.SUCCESS };
};

export const resetPasswordConfig: core.NexusOutputFieldConfig<"Mutation", "resetPassword"> = {
  type: "ApiCall",
  args: {
    email: nonNull(stringArg()),
    currentPassword: nonNull(stringArg()),
    newPassword: nonNull(stringArg())
  },
  resolve: resetPasswordResolver
};
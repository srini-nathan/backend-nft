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

export const resetPasswordResolver: core.FieldResolver<"Mutation", "resetPassword"> = async (
    _parent,
    { email },
    context
  ) => {
  
    enforce(
        validateEmail(email.toLocaleLowerCase()),
        ErrorCodesEnum.INVALID_EMAIL,
        ForbiddenError,
      )
  
    const existingUser = await context.prisma.user.findUnique({where: email });
    enforceExists(existingUser, ErrorCodesEnum.PASSWORD_CHANGE_FORBIDDEN,ForbiddenError)
    

    const user = await context.prisma.user.update({
      data: {
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
        email: nonNull(stringArg())
    },
    resolve: resetPasswordResolver
  };
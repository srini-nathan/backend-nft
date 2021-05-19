import CasimirError from "./CasimirError";
import { ErrorCodesEnum } from "../../types/ErrorCodes";
export default class ForbiddenError extends CasimirError {
  constructor(...args: any[]) {
    super(403, ...args);
    Error.captureStackTrace(this, ForbiddenError);
  }
}

export const requiredFieldError = () => {
  return new ForbiddenError(ErrorCodesEnum.FIELD_IS_REQUIRED);
};
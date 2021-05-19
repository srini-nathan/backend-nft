import CasimirError from "./CasimirError";
export default class UnauthorizedError extends CasimirError {
  constructor(...args: any[]) {
    super(401, ...args);
    Error.captureStackTrace(this, UnauthorizedError);
  }
}
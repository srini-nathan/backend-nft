import CasimirError from "./CasimirError";
export default class InternalServerError extends CasimirError {
  constructor(...args: any[]) {
    super(500, ...args);
    Error.captureStackTrace(this, InternalServerError);
  }
}
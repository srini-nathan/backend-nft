import CasimirError from "./CasimirError";
export default class InvalidRequestError extends CasimirError {
  constructor(...args: any[]) {
    super(400, ...args);
    Error.captureStackTrace(this, InvalidRequestError);
  }
}

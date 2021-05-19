import CasimirError from "./CasimirError";

export default class InvalidValueError extends CasimirError {
  constructor(...args: any[]) {
    super(400, ...args);
    Error.captureStackTrace(this, InvalidValueError);
  }
}
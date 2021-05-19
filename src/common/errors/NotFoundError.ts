import CasimirError from "./CasimirError";
export default class NotFoundError extends CasimirError {
  constructor(...args: any[]) {
    super(404, ...args);
    Error.captureStackTrace(this, NotFoundError);
  }
}
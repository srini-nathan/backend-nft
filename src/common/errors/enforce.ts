import { ErrorCodesEnum } from "../../types/ErrorCodes";
import CasimirError from "./CasimirError";
import { exists } from "../exists";
import NotFoundError from "./NotFoundError";

interface HttpResponse {
  status: number;
}

export function enforce(
  value: boolean,
  code: ErrorCodesEnum,
  ErrorType: new (code: ErrorCodesEnum) => CasimirError
): asserts value is true {
  if (!value) {
    throw new ErrorType(code);
  }
}

export function enforceExists<T>(
  value: T | undefined | null,
  code: ErrorCodesEnum,
  ErrorType?: new (code: ErrorCodesEnum) => CasimirError
): asserts value is T {
  enforce(exists(value), code, ErrorType ?? NotFoundError);
}

export function enforceUnset<T>(
  value: T | undefined | null,
  code: ErrorCodesEnum,
  ErrorType?: new (code: ErrorCodesEnum) => CasimirError
): asserts value is undefined | null {
  enforce(!exists(value), code, ErrorType ?? NotFoundError);
}

export function enforceHttpStatus(
  httpResponse: HttpResponse,
  status: number,
  code: ErrorCodesEnum,
  ErrorType?: new (code: ErrorCodesEnum) => CasimirError
) {
  enforce(httpResponse.status !== status, code, ErrorType ?? NotFoundError);
}
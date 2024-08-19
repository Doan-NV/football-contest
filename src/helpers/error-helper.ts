/* eslint-disable @typescript-eslint/no-explicit-any */
import { constraintErrors } from '../filters/constraint-errors';

export class ErrorHelper extends Error {
  code: number;

  message: string;

  error: string;

  data?: Record<string, any>;

  constructor(
    code: number,
    message = '',
    error = '',
    data?: Record<string, any>,
  ) {
    super();
    this.code = code;
    this.message = !message ? constraintErrors[code] : message;
    this.error = error ? error : constraintErrors[code];
    this.data = data;
  }

  toResponse(): {
    code: number;
    message: string;
    error: string;
    data?: Record<string, any>;
  } {
    return {
      code: this.code,
      message: this.message,
      error: this.error,
      data: this.data,
    };
  }
}

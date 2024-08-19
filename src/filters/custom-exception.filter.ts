import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';

import { ErrorHelper } from '../helpers/error-helper';

@Catch(ErrorHelper)
export class CustomExceptionFilter implements ExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/require-await
  async catch(exception: ErrorHelper, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(HttpStatus.BAD_REQUEST).json(exception.toResponse());
  }
}

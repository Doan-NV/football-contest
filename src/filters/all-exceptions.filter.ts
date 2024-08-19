import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpException } from '@nestjs/common';
import type { Response } from 'express';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    console.info('exception:', exception, host);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();

    const message = exception.getResponse() as {
      key: string;
      args: Record<string, unknown>;
    };

    response.status(statusCode).json({ statusCode, message });
  }
}

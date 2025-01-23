import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class NotFoundBankAccountFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception.message === 'Bank account not found') {
      return response.status(HttpStatus.NOT_FOUND).json({
        status: 'error',
        message: exception.message,
      });
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: exception.message,
    });
  }
}

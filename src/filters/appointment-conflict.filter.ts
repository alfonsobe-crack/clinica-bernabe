import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppointmentConflictException } from '../exceptions/appointment-conflict.exception';

@Catch(AppointmentConflictException)
export class AppointmentConflictFilter implements ExceptionFilter {
  catch(exception: AppointmentConflictException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    res.status(HttpStatus.CONFLICT).json({
      statusCode: HttpStatus.CONFLICT,
      error: 'Appointment conflict',
      message: exception.message,
      veterinarian: exception.doc,
      appointmentDate: exception.appointmentDate,
      suggestion: 'Seleccione otro horario o doctor.',
      timestamp: new Date().toISOString(),
      path: req.url,
    });
  }
}
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAppointmentDto } from 'src/dto/create-appointment.dto';
import { AppointmentsService } from './appointments.service';

@Controller('appointments')
export class AppointmentsController {
 
    constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Post()
  create(@Body() dto: CreateAppointmentDto) {
    return this.appointmentsService.scheduleAppointment(dto);
  }



}

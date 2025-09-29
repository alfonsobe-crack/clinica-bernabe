import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateAppointmentDto } from 'src/dto/create-appointment.dto';
import { AppointmentsService } from './appointments.service';
import { UpdateAppointmentDto } from 'src/dto/update-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
 
    constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  async findAll() {
    return await this.appointmentsService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateAppointmentDto) {
    return await this.appointmentsService.create(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.appointmentsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return await this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.appointmentsService.remove(+id);


  }
}

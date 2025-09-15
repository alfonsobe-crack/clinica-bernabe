import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from 'src/dto/create-doctor.dto';

@Controller('doctors')
export class DoctorsController {

constructor(private readonly doctorsService: DoctorsService){}

  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const doc = this.doctorsService.findOne(id);

    if(!doc){
      throw new Error('Doctor not found')
    }
    return doc;
  }

  @Post()
  create(@Body() doctordto: CreateDoctorDto) {
    return this.doctorsService.create(doctordto);
  }




}



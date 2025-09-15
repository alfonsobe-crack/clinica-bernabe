import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsModule } from './patients.module';
import { CreatePatientDto } from 'src/dto/create-patient.dto';

@Controller('patients')
export class PatientsController {

constructor(private readonly patientsService: PatientsService) {}

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const pt = this.patientsService.findOne(id);

    if(!pt){
      throw new Error('Patient not found')
    }
    return pt;
  }

  @Post()
  create(@Body() patientdto: CreatePatientDto) {
    return this.patientsService.create(patientdto);
  }


}

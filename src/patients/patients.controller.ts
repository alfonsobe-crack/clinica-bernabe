import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsModule } from './patients.module';
import { CreatePatientDto } from 'src/dto/create-patient.dto';
import { UpdatePatientDto } from 'src/dto/update-patient.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('patients')
export class PatientsController {

constructor(private readonly patientsService: PatientsService) {}

@UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.patientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const pt = this.patientsService.findOne(id);

    if(!pt){
      throw new Error('Patient not found')
    }
    return pt;
  }

  @Post()
  async create(@Body() patientdto: CreatePatientDto) {
    return await this.patientsService.create(patientdto);
  }

   @Patch(':id')
  async update(@Param('id') id: number, @Body() updatePatientDto: UpdatePatientDto) {
    return await this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.patientsService.remove(+id);
  }


}

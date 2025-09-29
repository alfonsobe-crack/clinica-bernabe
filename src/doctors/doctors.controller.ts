import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from 'src/dto/create-doctor.dto';
import { UpdateDoctorDto } from 'src/dto/update-doctor.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('doctors')
export class DoctorsController {

constructor(private readonly doctorsService: DoctorsService){}
 @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.doctorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const doc = this.doctorsService.findOne(id);

    if(!doc){
      throw new Error('Doctor not found')
    }
    return doc;
  }

  @Post()
  async create(@Body() doctordto: CreateDoctorDto) {
    return await this.doctorsService.create(doctordto);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateDoctorDto: UpdateDoctorDto) {
    return await this.doctorsService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.doctorsService.remove(+id);
  }

}



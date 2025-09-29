import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDoctorDto } from 'src/dto/create-doctor.dto';
import { UpdateDoctorDto } from 'src/dto/update-doctor.dto';
import { Doctor } from 'src/entities/doctor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorsService {

    constructor(
      @InjectRepository(Doctor)
      private readonly doctorRepository: Repository<Doctor>  
    ){}

    async create(CreateDoctorDto: CreateDoctorDto): Promise<Doctor>{
      
       const existingDoctor = await this.doctorRepository.findOne({
         where: { cmp: CreateDoctorDto.cmp }
       })

       if(existingDoctor){
           throw new ConflictException('El CMP ya está registrado');
       }


       const doc = this.doctorRepository.create(CreateDoctorDto);

       return await this.doctorRepository.save(doc);
    }

    async findAll(): Promise<Doctor[]>{
        return await this.doctorRepository.find({});
    }

    async findOne(id: number): Promise<Doctor>{
        const dc = await this.doctorRepository.findOne({
            where: {id},
            relations: ['appointments']
        });

        if(!dc){
            throw new NotFoundException(`Doctor con ID ${id} no encontrado`)
        }
        return dc;
    }

    async update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor>{
        const doc = await this.findOne(id);

        Object.assign(doc, updateDoctorDto)

        return await this.doctorRepository.save(doc);
    }

    async remove(id: number): Promise<void>{
        const doc = await this.findOne(id);
        await this.doctorRepository.remove(doc);
    }

    async findByCMP(cmp: number): Promise<Doctor | null>{
        return await this.doctorRepository.findOne({
            where: {cmp},
            select: ['id','name','cmp']
        });
    }

}

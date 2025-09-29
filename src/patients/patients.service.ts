import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePatientDto } from 'src/dto/create-patient.dto';
import { UpdatePatientDto } from 'src/dto/update-patient.dto';
import { Patient } from 'src/entities/patient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientsService {

    constructor(
      @InjectRepository(Patient)
      private readonly patientRepository: Repository<Patient>  
    ){}

    async create(createPatientDto: CreatePatientDto): Promise<Patient>{
          
        const existingPatient = await this.patientRepository.findOne({
          where: { email: createPatientDto.email }
        })
    
        if(existingPatient){
          throw new ConflictException('El paciente ya está registrado');
        }
    
        const pt = this.patientRepository.create(createPatientDto);
    
        return await this.patientRepository.save(pt);
    }


    async findAll(): Promise<Patient[]>{
        return await this.patientRepository.find({
             relations: ['appointments'],
             order: { createdAt: 'DESC'}
        });
    }


    async findOne(id: number): Promise<Patient>{
        const pt = await this.patientRepository.findOne({
            where: {id},
            relations: ['appointments']
        });

        if(!pt){
            throw new NotFoundException(`Paciente con ID ${id} no encontrado`)
        }
        return pt;
    }

    async update(id: number, updatePatientDto: UpdatePatientDto): Promise<Patient>{
            const pt = await this.findOne(id);
    
            Object.assign(pt, updatePatientDto)
    
            return await this.patientRepository.save(pt);
    }
    
    async remove(id: number): Promise<void>{
        const pt = await this.findOne(id);
        await this.patientRepository.remove(pt);
    }

    async findByEmail(email: string): Promise<Patient | null>{
        return await this.patientRepository.findOne({
            where: {email},
            select: ['id','name','email']
        });
    }


}

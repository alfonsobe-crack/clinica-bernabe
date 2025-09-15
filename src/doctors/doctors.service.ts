import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from 'src/dto/create-doctor.dto';
import { caremode, clinicasede, Doctor, doctorspecialty } from 'src/entities/doctor.entity';
import { Patient } from 'src/entities/patient.entity';

@Injectable()
export class DoctorsService {

      private doctors: Doctor[] = [
            {
            id: 1,
            name: 'Paulo Gonzales',
            age: 38,  
            specialty: doctorspecialty.CARDIOLOGIA,
            cmp: 1920,
            mode: caremode.PRESENCIAL,
            sede: clinicasede.SANBORJA,
            createdAt: new Date('2025-04-30')
            },
            {
            id: 2,
            name: 'Miguel Lozano',
            age: 37, 
            specialty: doctorspecialty.INTERNA,
            cmp: 2929,
            mode: caremode.VIRTUAL,
            sede: clinicasede.SURCO,
            createdAt: new Date('2025-04-30')
            },
            {
            id: 3,
            name: 'Luisa Chavez',
            age: 41, 
            specialty: doctorspecialty.PEDIATRIA,
            cmp: 2000,
            mode: caremode.VIRTUAL,
            sede: clinicasede.LIMA,
            createdAt: new Date('2025-04-30')
            }       
        ];

        private nextId = 4;
        
        findAll(): Doctor[] {
          return this.doctors;
        }
        
        findOne(id: number): Doctor{
            const doctor = this.doctors.find(d => d.id === id);
            if (!doctor) throw new NotFoundException (`Doctor ${id} no existe`);
            return doctor;
        }

        findDoctorSpecialty(id: number): string{
            const doctor = this.doctors.find(d => d.id === id);
            if (!doctor) throw new NotFoundException (`Doctor ${id} no existe`);
            return doctor.specialty;
        }

        findDoctorSede(id: number): string{
            const doctor = this.doctors.find(d => d.id === id);
            if (!doctor) throw new NotFoundException (`Doctor ${id} no existe`);
            return doctor.sede;
        }     
        
        findDoctorMode(id: number): string{
            const doctor = this.doctors.find(d => d.id === id);
            if (!doctor) throw new NotFoundException (`Doctor ${id} no existe`);
            return doctor.mode;
        }  
        
            create(data: CreateDoctorDto) {
        
             const doc: Doctor = { id: this.nextId++, createdAt: new Date(), ...data, };
             this.doctors.push(doc);
             return doc;
            }






}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from 'src/dto/create-patient.dto';
import { Patient, patientsex } from 'src/entities/patient.entity';

@Injectable()
export class PatientsService {

  private patients: Patient[] = [
        {
        id: 1,
        name: 'Carlos Zegarra',
        email: 'cazesa@gmail.com',
        age: 24,  
        weight: 70,
        height: 170,
        sex: patientsex.MALE,
        hasdiagnoses: true,
        diagnoses: 'diabetes',
        insured: true,
        insurancecompany: 'Rimac Seguros',
        activeAppointments: 1,
        createdAt: new Date('2025-04-30')
        },
        {
        id: 2,
        name: 'Alfonso Bernabe',
        email: 'alfonsobe@gmail.com',
        age: 37,  
        weight: 80,
        height: 176,
        sex: patientsex.MALE,
        hasdiagnoses: false,
        insured: true,
        insurancecompany: 'Pacifico Seguros',
        activeAppointments: 1,
        createdAt: new Date('2025-04-30')
        },
        {
        id: 3,
        name: 'Monica Espino',
        email: 'moni@gmail.com',
        age: 37,  
        weight: 70,
        height: 154,
        sex: patientsex.FEMALE,
        hasdiagnoses: false,
        insured: true,
        insurancecompany: 'Rimac Seguros',
        activeAppointments: 1,
        createdAt: new Date('2025-04-30')
        }       
    ];

    private nextId = 4;

    findAll(): Patient[] {
        return this.patients;
    }

    findOne(id: number): Patient{
        const patient = this.patients.find(p => p.id === id);
        if (!patient) throw new NotFoundException (`Paciente ${id} no existe`);
        return patient;
    }

    create(data: CreatePatientDto) {

     const pt: Patient = { id: this.nextId++, createdAt: new Date(), activeAppointments: 0, ...data, };
     this.patients.push(pt);
     return pt;
    }






}

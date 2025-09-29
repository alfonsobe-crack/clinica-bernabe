import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn } from 'typeorm';
import { Doctor } from './doctor.entity';
import { Patient } from './patient.entity';
import { Exclude } from 'class-transformer';


export enum UserRole {
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  PATIENT = 'patient',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  @Exclude()
  password: string; 

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PATIENT,
  })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  // Relación 1 a 1 con doctor (si este user es doctor)
  @OneToOne(() => Doctor, doctor => doctor.user)
  doctor: Doctor;

  // Relación 1 a 1 con paciente (si este user es paciente)
  @OneToOne(() => Patient, patient => patient.user)
  patient: Patient;
}
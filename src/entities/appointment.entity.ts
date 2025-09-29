import { ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, Column, JoinColumn, Entity } from "typeorm";
import { Doctor } from "./doctor.entity";
import { Patient } from "./patient.entity";

export enum ApptmStatus{
    SCHEDULED = 'Programado',
    PENDING = 'Pendiente',
    PAYED = 'Pagado',
    CANCELLED = 'Cancelado'
}

@Entity('appointments')
export class Appointment{
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Doctor, doctor => doctor.appointments)
    @JoinColumn({ name: 'doctor_id' })
    doctor: Doctor;
    
    @ManyToOne(() => Patient, patient => patient.appointments)
    @JoinColumn({ name: 'patient_id'})
    patient: Patient;

    @Column({ type: "timestamp"})
    fechahora: Date;

    @Column()
    specialty?: string;
    
    @Column()
    sede?: string;
    
    @Column()
    mode?: string;
    
    @Column()
    status: ApptmStatus;
    
    @CreateDateColumn()
    createdAt: Date;
}
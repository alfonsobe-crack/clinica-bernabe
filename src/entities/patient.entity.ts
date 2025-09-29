import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./appointment.entity";
import { User } from "./user.entity";

export enum patientsex{
    MALE = 'Masculino',
    FEMALE = 'Femenino',
    OTHER = 'Otro',
}

@Entity('patients')
export class Patient{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column( {unique: true })
    email: string;

    @Column()
    age: number;

    @Column({ nullable: true})
    weight: number;

    @Column({ nullable: true})
    height: number;

    @Column( { type: 'enum', enum: patientsex})
    sex: patientsex;

    @Column( {default: false })
    hasdiagnoses: boolean;
    
    @Column({ nullable: true})
    diagnoses?: string;
    
    @Column( {default: false} )
    insured: boolean;
    
    @Column({ nullable: true})
    insurancecompany?: string;
    
    @Column( {default: 0})
    activeAppointments: number;
    
    @CreateDateColumn()
    createdAt: Date;

    // Relación 1 a 1 con User
    @OneToOne(() => User, user => user.patient)
    @JoinColumn()
    user: User;

    // Un paciente puede tener muchas citas
    @OneToMany(() => Appointment, appointment => appointment.patient)
    appointments: Appointment[];
}
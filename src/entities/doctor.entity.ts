import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./appointment.entity";
import { User } from "./user.entity";

export enum doctorspecialty{
    PEDIATRIA = 'Pediatria',
    CARDIOLOGIA = 'Cardiologia',
    UROLOGIA = 'Urologia',
    INTERNA = 'Interna',
    GERIATRIA = 'Geriatria',
    NEUMOLOGIA = 'Neumologia',
    NEUROLOGIA = 'Neurologia',
    TRAUMATOLOGIA = 'Traumatologia',
    OTRO = 'Otro',
}

export enum caremode{
    PRESENCIAL = 'Presencial',
    VIRTUAL = 'Virtual',
}

export enum clinicasede{
    SANBORJA = 'San Borja',
    LIMA = 'Lima',
    SURCO = 'Surco',
}

@Entity('doctors')
export class Doctor{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column({ type: 'enum', enum: doctorspecialty })
    specialty: doctorspecialty;

    @Column()
    cmp: number;

    @Column({ type: 'enum', enum: caremode })
    mode: caremode;

    @Column({ type: 'enum', enum: clinicasede })
    sede: clinicasede;

    @CreateDateColumn()
    createdAt: Date;


    // Relación 1 a 1 con User
    @OneToOne(() => User, user => user.doctor)
    @JoinColumn()
    user: User;

    // Un doctor puede tener muchas citas
    @OneToMany(() => Appointment, appointment => appointment.doctor)
    appointments: Appointment[];
}
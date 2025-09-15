export enum ApptmStatus{
    SCHEDULED = 'scheduled',
    PENDING = 'pending',
    PAYED = 'payed',
    CANCELLED = 'cancelled'
}


export class Appointment{
    id: number;
    doctorId: number;
    patientId: number;
    fechahora: Date;
    specialty?: string;
    sede?: string;
    mode?: string;
    status: ApptmStatus;
    createdAt: Date;
}
export enum patientsex{
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

export class Patient{
    id: number;
    name: string;
    email: string;
    age: number;
    weight: number;
    height: number;
    sex: patientsex;
    hasdiagnoses: boolean;
    diagnoses?: string;
    insured: boolean;
    insurancecompany?: string;
    activeAppointments: number;
    createdAt: Date;
}
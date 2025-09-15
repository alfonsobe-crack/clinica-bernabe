export enum doctorspecialty{
    PEDIATRIA = 'pediatria',
    CARDIOLOGIA = 'cardiologia',
    UROLOGIA = 'urologia',
    INTERNA = 'interna',
    GERIATRIA = 'geriatria',
    NEUMOLOGIA = 'neumologia',
    NEUROLOGIA = 'neurologia',
    TRAUMATOLOGIA = 'traumatologia',
    OTRO = 'otro',
}

export enum caremode{
    PRESENCIAL = 'presencial',
    VIRTUAL = 'virtual',
}

export enum clinicasede{
    SANBORJA = 'sanborja',
    LIMA = 'lima',
    SURCO = 'surco',
}

export class Doctor{
    id: number;
    name: string;
    age: number;
    specialty: doctorspecialty;
    cmp: number;
    mode: caremode;
    sede: clinicasede;
    createdAt: Date;
}
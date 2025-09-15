import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Appointment, ApptmStatus } from 'src/entities/appointment.entity';
import { toZonedTime } from 'date-fns-tz';
import { DoctorsService } from '../doctors/doctors.service';
import { PatientsService } from 'src/patients/patients.service';
import { AppointmentConflictException } from 'src/exceptions/appointment-conflict.exception';

@Injectable()
export class AppointmentsService {

     private apptms: Appointment[] = [
        {
            id: 1,
            doctorId: 1,
            patientId: 1,
            status: ApptmStatus.SCHEDULED,
            createdAt: new Date(),
            fechahora: new Date(),
            specialty: 'NEUROLOGIA',
            sede: 'SANBORJA',
            mode: 'PRESENCIAL'
        }
    ];

    private nextId = 2;
    constructor(private readonly doctorsService: DoctorsService, private readonly patientsService: PatientsService){}
    private timeZone = 'America/Lima';

    findAll(){
    return this.apptms;
    }

   private toLocalDate(date: Date): Date {
     return toZonedTime(date,this.timeZone);
    }

    private isBusinessDay(date: Date) {
      const local = this.toLocalDate(date);
      const d = date.getDay();
      return d >= 1 &&  d <= 6;
    }

    private isBusinessHour(date: Date){
      const local = this.toLocalDate(date);
      const hour = local.getHours();
      const min = local.getMinutes();
      if(hour < 8) return false;
      if(hour > 17) return false;
      if(hour === 17 && min > 59) return false;
      return true;
    }

    scheduleAppointment(input: {
      doctorId: number;
      patientId: number;
      fechahora: Date;

    }) {
         const { doctorId,patientId, fechahora } = input;

          // 1) Doctor existe
          const doctor = this.doctorsService.findOne(doctorId);
          if (!doctor) throw new NotFoundException(`Doctor ${doctorId} no existe`);

         // 2) Paciente existe
          const pcte = this.patientsService.findOne(patientId);
          if (!pcte) throw new NotFoundException(`Paciente ${patientId} no existe`);

          // 3) Fecha futura
          const now = new Date();
          if (fechahora.getTime() <= now.getTime()) {
             throw new BadRequestException('La fecha de la cita debe ser futura.');
          }

          // 4) Horario laboral: Lun–Sáb 08:00–18:00
          if (!this.isBusinessDay(fechahora) || !this.isBusinessHour(fechahora)) {
            throw new BadRequestException('La cita debe estar dentro del horario laboral (Lun–Sáb, 08:00–18:00).');
           }

          // 5) Sin conflicto mismo veterinario + misma hora exacta
            const conflict = this.apptms.find(a =>
            a.doctorId === doctorId &&
            a.fechahora.getTime() === fechahora.getTime() &&
            a.status === 'scheduled'
            );
            if (conflict) {
            throw new AppointmentConflictException(doctorId, fechahora);
            }

            // 5) Reglas por servicio/edad
           // if (service === ApptService.SURGERY && !pet.isVaccinated) {
            //throw new VaccinationRequiredException(petId,pet.name);
            //}
            //if (pet.age < 3 && service !== ApptService.CONSULTATION) {
            //throw new BadRequestException('Mascotas menores a 3 meses solo pueden recibir consultas.');
            //}

            // Crear
            const appt: Appointment = {
            id: this.nextId++,
            doctorId,
            patientId,
            fechahora,
            specialty: this.doctorsService.findDoctorSpecialty(doctorId),
            sede: this.doctorsService.findDoctorSede(doctorId),
            mode: this.doctorsService.findDoctorMode(doctorId),
            status: ApptmStatus.SCHEDULED,
            createdAt: new Date(),
            };
            this.apptms.push(appt);
            return appt;
        }





}

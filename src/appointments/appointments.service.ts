import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Appointment, ApptmStatus } from 'src/entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from 'src/entities/doctor.entity';
import { Patient } from 'src/entities/patient.entity';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from 'src/dto/create-appointment.dto';
import { UpdateAppointmentDto } from 'src/dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {

  apptms: any;
  doctorsService: any;
  patientsService: any;
  nextId: any;


    constructor(
        @InjectRepository(Appointment)
        private appointmentRepository: Repository<Appointment>,        
        @InjectRepository(Doctor)
        private doctorRepository: Repository<Doctor>,
        @InjectRepository(Patient)
        private patientRepository: Repository<Patient>,

    ){}



    async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment>{

        const doc = await this.doctorRepository.findOne({
            where: {id: createAppointmentDto.doctorId}
        });

        if(!doc){
            throw new NotFoundException('Doctor no encontrado')
        }


        const pt = await this.patientRepository.findOne({
            where: {id: createAppointmentDto.patientId}
        });

        if(!pt){
            throw new NotFoundException('Paciente no encontrado')
        }

        const appointmentDate = new Date(createAppointmentDto.fechahora);

        const day = appointmentDate.getDay();
        const hour = appointmentDate.getHours();

        if(day === 0 || hour === 6){
          throw new BadRequestException('Las citas solo pueden agendarse de Lunes a Viernes');
        }

        if(hour < 8 || hour > 18){
          throw new BadRequestException('Las citas solo pueden agendarse de Lunes a Viernes de 8 a 18 horas');
        }     
        
        const now = new Date();
        if (appointmentDate.getTime() <= now.getTime()) {
             throw new BadRequestException('La fecha de la cita debe ser futura.');
        }

        const existingAppointment = await this.appointmentRepository.findOne({
           where: {
             doctor: { id: doc.id },
             fechahora: appointmentDate,
           },
           relations: ['doctor'],
        }); 

        if (existingAppointment) {
           throw new BadRequestException('El doctor ya tiene una cita reservada en ese horario');
        }
        

        const appt = this.appointmentRepository.create({
            ...createAppointmentDto,
            doctor: doc,
            patient: pt
        });


        return await this.appointmentRepository.save(appt);

    }

    async findAll(): Promise<Appointment[]>{
     return await this.appointmentRepository.find({
        relations: ['doctor', 'patient'],
        order: {fechahora: 'ASC'},
     });
    }

    async findOne(id: number): Promise<Appointment>{
     const appt = await this.appointmentRepository.findOne({
      where: { id },  
      relations: ['doctor', 'patient'],
     });

     if(!appt){
       throw new NotFoundException(`Cita con id ${id} no encontrada`);
     }
     return appt;

    }

    async update (id: number, updateAppointmentDto: UpdateAppointmentDto ): Promise<Appointment>{
       const appt = await this.findOne(id);

       if(updateAppointmentDto.doctorId) {
         const doc = await this.doctorRepository.findOne({
            where: { id: updateAppointmentDto.doctorId},
         });
         if(!doc){
            throw new NotFoundException('Doctor no encontrado');
         }
         appt.doctor = doc;
       }

       if(updateAppointmentDto.patientId) {
         const pt = await this.patientRepository.findOne({
            where: { id: updateAppointmentDto.patientId},
         });
         if(!pt){
            throw new NotFoundException('Paciente no encontrado');
         }
         appt.patient = pt;
       }

       // 📌 Validar la fecha nueva (si viene en el DTO)
       if (updateAppointmentDto.fechahora) {
         const fecha = new Date(updateAppointmentDto.fechahora);

          // 1. Validar día de la semana (1=Lunes ... 5=Viernes)
          const day = fecha.getDay(); // 0=Domingo, 6=Sábado
          if (day === 0 || day === 6) {
            throw new BadRequestException('La cita debe ser de lunes a viernes.');
          }

          // 2. Validar hora (8 a 17)
          const hour = fecha.getHours();
          if (hour < 8 || hour >= 17) {
            throw new BadRequestException('La cita debe estar entre las 08:00 y 17:00 horas.');
          }

        const now = new Date();
        if (fecha.getTime() <= now.getTime()) {
             throw new BadRequestException('La fecha de la cita debe ser futura.');
        }

          // 3. Validar conflicto con otra cita del mismo doctor
          const conflict = await this.appointmentRepository.findOne({
            where: {
              doctor: appt.doctor,
              fechahora: fecha,
            },
          });

          if (conflict && conflict.id !== appt.id) {
          throw new BadRequestException('Ya existe una cita para ese doctor en esa fecha y hora.');
          }

           appt.fechahora = fecha;
        }

        const { doctorId, patientId, ...rest } = updateAppointmentDto;

       Object.assign(appt, rest);
       
       return await this.appointmentRepository.save(appt);

    }

    async remove(id: number): Promise<void> {
      const appt = await this.findOne(id);
      await this.appointmentRepository.remove(appt);
    }


}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './patients/patients.module';
import { DoctorsModule } from './doctors/doctors.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { AppointmentConflictFilter } from './filters/appointment-conflict.filter';
import { APP_FILTER } from '@nestjs/core';


@Module({
  imports: [PatientsModule, DoctorsModule, AppointmentsModule],
  controllers: [AppController],
    providers: [
      AppService,
    { provide: APP_FILTER, useClass: AppointmentConflictFilter },
  ],
})
export class AppModule {}

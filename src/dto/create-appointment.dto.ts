import { IsDate, IsEnum, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApptmStatus } from 'src/entities/appointment.entity';


export class CreateAppointmentDto {
  @IsNumber()
  @IsNotEmpty()
  doctorId: number;

 @IsNumber()
 @IsNotEmpty()
  patientId: number;

@Type(() => Date) @IsDate()
  fechahora: Date;

  @IsOptional()
  specialty?: string;

  @IsOptional()
  sede?: string; 

  @IsOptional()
  mode?: string;  

  @IsEnum(ApptmStatus)
  status: ApptmStatus;


}
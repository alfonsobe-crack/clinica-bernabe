import { IsDate, IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateAppointmentDto {
  @IsInt()
  doctorId: number;

 @IsInt()
  patientId: number;

@Type(() => Date) @IsDate()
  fechahora: Date;

  


}
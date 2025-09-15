import { IsBoolean, isDate, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min, MinLength, IsDate, IsEnum, IsEmail } from 'class-validator';
import { caremode, clinicasede, doctorspecialty } from 'src/entities/doctor.entity';
import { patientsex } from 'src/entities/patient.entity';

export class CreateDoctorDto {
  @IsString() @IsNotEmpty() @MinLength(2)
  name: string;

  @IsEnum(doctorspecialty, { message: 'specialty debe ser pediatria, cardiologia, urologia, interna, geriatria, neumologia, neurologia, traumatologia, otro'})
  specialty: doctorspecialty;

  @IsInt() @Min(1) // > 0 
  age: number; 

  @IsInt() @Min(1) // > 0 
  cmp: number; 

  @IsEnum(caremode, { message: 'mode debe ser presencial, virtual'})
  mode: caremode;

@IsEnum(clinicasede, { message: 'sede debe ser Lima, San Borja o Surco'})
  sede: clinicasede;
  

}
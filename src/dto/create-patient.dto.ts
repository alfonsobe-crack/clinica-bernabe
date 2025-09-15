import { IsBoolean, isDate, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min, MinLength, IsDate, IsEnum, IsEmail } from 'class-validator';
import { patientsex } from 'src/entities/patient.entity';

export class CreatePatientDto {
  @IsString() @IsNotEmpty() @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(patientsex, { message: 'sexo debe ser male, female, o other' })
  sex: patientsex;

  @IsInt() @Min(1) // > 0 meses
  age: number; 

  @IsInt() @Min(1) // > 0 meses
  weight: number; 

  @IsInt() @Min(1) // > 0 meses
  height: number; 

  @IsBoolean()
  hasdiagnoses: boolean;

  @IsBoolean()
  insured: boolean;

  @IsOptional() @IsString()
  diagnoses?: string;

  @IsOptional() @IsString()
  insurancecompany: string;

}
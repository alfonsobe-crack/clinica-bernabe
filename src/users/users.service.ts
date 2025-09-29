import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Doctor } from 'src/entities/doctor.entity';
import { Patient } from 'src/entities/patient.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

async create(email: string, name: string, password: string, role: UserRole): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
      role

    });
    return this.usersRepository.save(user);
  }

async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ 
      where: { email },
      relations: ['doctor', 'patient'] 
    });
     
  }

async findById(id: number): Promise<User | null> {
    const user = await this.usersRepository.findOne({ 
      where: { id },
      relations: ['doctor', 'patient']
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

async update(id: number, updateData: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    if(!user){
      throw new NotFoundException('Usuario no encontrado');  
    }
    
    Object.assign(user, updateData);
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findById(id);

    if(!user){
      throw new NotFoundException('Usuario no encontrado');  
    }

    await this.usersRepository.remove(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['doctor', 'patient']
    });
  }




}

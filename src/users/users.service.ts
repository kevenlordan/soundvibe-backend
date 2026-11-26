import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existing = await this.usersRepository.findOne({
      where: [{ email: createUserDto.email }, { username: createUserDto.username }],
    });
    if (existing) {
      throw new ConflictException('Email or username already exists');
    }

    const salt = await bcrypt.genSalt();
    const password_hash = await bcrypt.hash(createUserDto.password, salt);

    const user = this.usersRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password_hash,
    });

    const saved = await this.usersRepository.save(user);
    const { password_hash: _, ...result } = saved;
    return result;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findAll() {
    return this.usersRepository.find({
      select: { user_id: true, username: true, email: true, role: true, date_joined: true },
    });
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { user_id: id },
      select: { user_id: true, username: true, email: true, role: true, date_joined: true },
    });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
    return { deleted: true, user_id: id };
  }
}
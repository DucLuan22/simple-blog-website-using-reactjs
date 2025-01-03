import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async updateHashedRefreshToken(userId: number, hashedRefreshToken: string) {
    return await this.userRepository.update(
      { id: userId },
      { hashedRefreshToken },
    );
  }

  async findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      select: [
        'id',
        'familyName',
        'givenName',
        'avatar_url',
        'email',
        'google_id',
        'hashedRefreshToken',
      ],
    });
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

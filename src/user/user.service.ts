import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, username } = createUserDto;

    const existUser = await this.findOne(email);
    if (existUser) {
      throw new BadRequestException();
    }

    const user = this.usersRepository.create({
      email,
      password,
      username,
    });
    await this.usersRepository.save(user);
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const { avatar_url } = updateUserDto;
    return this.usersRepository.update(id, { avatar_url });
  }

  findOne(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  async profile(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    delete user.id;
    delete user.password;
    return user;
  }
}

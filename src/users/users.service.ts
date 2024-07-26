import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { getHash } from './authentication/utils/crypt.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    ) {}
  async create(createUserDto: CreateUserDto): Promise<void> {
    const hash = await getHash(createUserDto.password);
    const user = this.usersRepository.create({ ...createUserDto, password: hash});
    await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findByUuid(uuid: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { uuid }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { username }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

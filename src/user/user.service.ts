import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashService } from 'src/shared/hash/hash.service';
import { getConnection, getRepository, In, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { SigninUserInput } from './dto/signin-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserEntity } from './entities/user.entity';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private readonly hashService: HashService,
  ) {}
  async createUser(createUserInput: CreateUserInput) {
    if (await this.userRepo.findOneBy({ email: createUserInput.email })) {
      throw new BadRequestException('user already exist with this email!');
    }
    const password = await this.hashService.generateHash(
      createUserInput.password,
    );
    const user = this.userRepo.create({
      ...createUserInput,
      password,
    });
    return this.userRepo.save(user);
  }

  async signinUser(signinUserInput: SigninUserInput) {
    const user = await this.userRepo.findOneBy({
      email: signinUserInput.email,
    });
    if (
      !user ||
      !(await this.hashService.comparePasswordWithHash(
        signinUserInput.password,
        user.password,
      ))
    ) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('Invalid user id!');
    }
    Object.assign(user, updateUserInput);
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('Invalid user id!');
    }
    return this.userRepo.remove(user);
  }
  async getUsersByIds(ids: readonly number[]): Promise<User[] | any> {
    const users = await this.userRepo.find({ where: { id: In(ids) } });
    return users;
  }
}

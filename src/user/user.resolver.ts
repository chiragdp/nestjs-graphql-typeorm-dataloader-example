import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { SigninUser, User } from './schemas/user.schema';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { SigninUserInput } from './dto/signin-user.input';
import { TokenService } from 'src/shared/token/token.service';

import { UserInputError } from '@nestjs/apollo';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  @Mutation(() => User, { name: 'signup' })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }

  @Mutation(() => SigninUser, { name: 'signin' })
  async signinUser(@Args('SigninUserInput') signinUserInput: SigninUserInput) {
    const user = await this.userService.signinUser(signinUserInput);
    const token = await this.tokenService.signLoginToken(
      { user: user.id },
      {
        expiresIn: '100m',
      },
    );
    return { ...user, accessToken: token };
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    const user = await this.userService.findOne(id);
    if (!user) {
      return new UserInputError('No User found with this id 3!');
    }
    return user;
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}

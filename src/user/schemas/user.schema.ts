import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => Boolean)
  isActive: boolean;
}

@ObjectType()
export class SigninUser extends User {
  @Field(() => String)
  accessToken: string;
}

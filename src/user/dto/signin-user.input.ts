import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SigninUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

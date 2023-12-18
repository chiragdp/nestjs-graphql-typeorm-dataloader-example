import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  thumbnail: string;

  @Field(() => Int)
  categoryId: number;
}

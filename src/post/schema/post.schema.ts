import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category } from 'src/category/schema/category.schema';
import { User } from 'src/user/schemas/user.schema';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  slug: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  thumbnail: string;

  @Field(() => User)
  user: User;

  @Field(() => Int)
  userId: number;

  @Field(() => Category)
  category: Category;

  @Field(() => Int)
  categoryId: number;
}

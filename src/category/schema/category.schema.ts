import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/post/schema/post.schema';

@ObjectType()
export class Category {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  thumbnail: string;

  @Field(() => Category)
  category: Category;

  @Field(() => Int)
  categoryId: number;

  @Field(() => [Post])
  posts: Post[];
}

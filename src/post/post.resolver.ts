import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './schema/post.schema';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/user/guards/auth/auth.guard';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/schemas/user.schema';
import { IDataloaders } from 'src/dataloader/dataloader/dataloader.interface';
import { Category } from 'src/category/schema/category.schema';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private userService: UserService,
  ) {}

  @Mutation(() => Post)
  @UseGuards(AuthGuard)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @Context('user') user: UserEntity,
  ) {
    return this.postService.create(createPostInput, user);
  }

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    const post = await this.postService.findOne(id);
    return post;
  }

  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => Post)
  removePost(@Args('id', { type: () => Int }) id: number) {
    return this.postService.remove(id);
  }

  @ResolveField('user', () => User)
  async user(
    @Parent() post: Post,
    @Context() { loaders }: { loaders: IDataloaders },
  ) {
    const user = await loaders.usersLoader.load(post.userId);
    return user;
  }

  @ResolveField('category', () => User)
  async category(
    @Parent() post: Post,
    @Context() { loaders }: { loaders: IDataloaders },
  ) {
    const category = await loaders.categoryLoader.load(post.categoryId);
    return category;
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PostEntity } from './entities/post.entity';
import slugify from 'slugify';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity) private postRepo: Repository<PostEntity>,
  ) {}
  create(createPostInput: CreatePostInput, user: UserEntity) {
    const slug = slugify(createPostInput.title, {
      lower: true,
    });
    const post = this.postRepo.create({
      ...createPostInput,
      slug,
      user: user,
    });
    return this.postRepo.save(post);
  }

  findAll(filters: FindManyOptions<PostEntity> = {}): Promise<PostEntity[]> {
    return this.postRepo.find(filters);
  }

  findOne(id: number) {
    return this.postRepo.findOne({ where: { id } });
  }

  async update(id: number, updatePostInput: UpdatePostInput) {
    const post = await this.postRepo.findOneBy({ id });
    if (!post) {
      throw new BadRequestException('Invalid post id!');
    }
    Object.assign(post, updatePostInput);
    return this.postRepo.save(post);
  }

  async remove(id: number) {
    const post = await this.postRepo.findOneBy({ id });
    if (!post) {
      throw new BadRequestException('Invalid post id!');
    }
    return this.postRepo.remove(post);
  }
}

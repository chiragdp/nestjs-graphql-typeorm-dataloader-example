import { UserInputError } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostService } from 'src/post/post.service';
import { In, Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
    private postService: PostService,
  ) {}
  create(createCategoryInput: CreateCategoryInput) {
    const category = this.categoryRepo.create(createCategoryInput);
    return this.categoryRepo.save(category);
  }

  findAll() {
    return this.categoryRepo.find();
  }

  findOne(id: number) {
    return this.categoryRepo.findOne({ where: { id } });
  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput) {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) {
      return new UserInputError('No category found with this id!');
    }
    Object.assign(category, { ...updateCategoryInput });
    return this.categoryRepo.save(category);
  }

  async remove(id: number) {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) {
      return new UserInputError('No category found with this id!');
    }
    return this.categoryRepo.remove(category);
  }

  async getCategoriesByIds(
    ids: readonly number[],
  ): Promise<CategoryEntity[] | any> {
    const categories = await this.categoryRepo.find({ where: { id: In(ids) } });
    return categories;
  }

  async getPostsByCategoryId(id: number) {
    const posts = await this.postService.findAll({ where: { categoryId: id } });
    return posts;
  }
}

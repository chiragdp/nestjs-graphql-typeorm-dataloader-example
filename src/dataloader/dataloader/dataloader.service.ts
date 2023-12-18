import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as DataLoader from 'dataloader';
import { UserEntity } from 'src/user/entities/user.entity';
import { IDataloaders } from './dataloader.interface';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class DataloaderService {
  constructor(
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}
  getLoaders(): IDataloaders {
    const usersLoader = this._createUsersLoader();
    const categoryLoader = this._createCategoriesLoader();
    return {
      usersLoader,
      categoryLoader,
    };
  }
  private _createUsersLoader() {
    return new DataLoader<number, UserEntity>(
      async (keys: readonly number[]) =>
        await this.userService.getUsersByIds(keys as number[]),
    );
  }

  private _createCategoriesLoader() {
    return new DataLoader<number, UserEntity>(
      async (keys: readonly number[]) =>
        await this.categoryService.getCategoriesByIds(keys as number[]),
    );
  }
}

import DataLoader from 'dataloader';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { UserEntity } from 'src/user/entities/user.entity';

export interface IDataloaders {
  usersLoader: DataLoader<number, UserEntity>;
  categoryLoader: DataLoader<number, CategoryEntity>;
}

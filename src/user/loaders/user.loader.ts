import * as DataLoader from 'dataloader';
import { getRepository, In } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { User } from '../schemas/user.schema';

export const getUsersByIds = async (ids: string[]): Promise<User[]> => {
  const userRepo = getRepository(UserEntity, 'default2');
  const users = await userRepo.find({ where: { id: In(ids) } });
  return users;
};
export const userByIdsLoader = () => new DataLoader(getUsersByIds);

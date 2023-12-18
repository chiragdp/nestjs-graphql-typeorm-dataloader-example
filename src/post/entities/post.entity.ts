import { CategoryEntity } from 'src/category/entities/category.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'posts',
})
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  description: string;

  @Column()
  content: string;

  @Column()
  thumbnail: string;

  @ManyToOne(() => UserEntity, (user) => user.posts, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column()
  userId: number;

  @ManyToOne(() => CategoryEntity, (category) => category.posts, {
    nullable: true,
  })
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @Column()
  categoryId: number;
}

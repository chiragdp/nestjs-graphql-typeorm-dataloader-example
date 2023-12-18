import { PostEntity } from 'src/post/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'categories',
})
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => PostEntity, (post) => post.category, { nullable: true })
  posts: PostEntity[];
}

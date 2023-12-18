import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { UserModule } from 'src/user/user.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), UserModule, SharedModule],
  providers: [PostResolver, PostService],
  exports: [PostService],
})
export class PostModule {}

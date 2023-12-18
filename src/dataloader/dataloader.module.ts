import { Module } from '@nestjs/common';
import { CategoryModule } from 'src/category/category.module';
import { PostModule } from 'src/post/post.module';
import { SharedModule } from 'src/shared/shared.module';
import { UserModule } from 'src/user/user.module';
import { DataloaderService } from './dataloader/dataloader.service';

@Module({
  imports: [UserModule, SharedModule, PostModule, CategoryModule],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}

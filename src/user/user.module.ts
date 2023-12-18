import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { SharedModule } from 'src/shared/shared.module';
import { AuthGuard } from './guards/auth/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), SharedModule],
  providers: [UserResolver, UserService, AuthGuard],
  exports: [UserService, AuthGuard],
})
export class UserModule {}

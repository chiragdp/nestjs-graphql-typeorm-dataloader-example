import { Module } from '@nestjs/common';
import { HashService } from './hash/hash.service';
import { TokenService } from './token/token.service';

@Module({
  providers: [HashService, TokenService],
  exports: [HashService, TokenService],
})
export class SharedModule {}

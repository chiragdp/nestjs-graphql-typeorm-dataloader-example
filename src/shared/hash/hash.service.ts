import { Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class HashService {
  generateHash(password: string) {
    return bcryptjs.hash(password, 8);
  }

  comparePasswordWithHash(password: string, hash: string) {
    return bcryptjs.compare(password, hash);
  }
}

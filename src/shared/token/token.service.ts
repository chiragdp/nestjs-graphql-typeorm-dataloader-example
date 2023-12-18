import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
  secret = 'this is sec';
  signLoginToken(payload: any, options: jwt.SignOptions) {
    return jwt.sign(payload, this.secret, options);
  }

  verifyToken(token: string) {
    return jwt.verify(token, this.secret);
  }
}

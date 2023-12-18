import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, of } from 'rxjs';
import { UserService } from 'src/user/user.service';

import { TokenService } from '../../../shared/token/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private userService: UserService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const authorizationHeader = ctx.req.headers['authorization'];
    if (authorizationHeader) {
      try {
        const token = authorizationHeader.replace('Bearer ', '');
        let user = this.tokenService.verifyToken(token) as { user: number };
        return this.userService.findOne(user.user).then((userObj) => {
          if (!userObj.email) {
            return false;
          } else {
            ctx.user = userObj;
            return true;
          }
        });
      } catch (err) {
        return false;
      }
    } else {
      return false;
    }
  }
}

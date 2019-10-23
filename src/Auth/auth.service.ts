import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService implements CanActivate {
  constructor(private readonly jwtService: JwtService) {
  }

  async getCode() {
    return await this.jwtService.signAsync({ name: 'Homer Simpson', role: 'Porn Star' });
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const [args] = context.getArgs();
    let x;
    try {
      x = this.jwtService.verify(args.headers.authorization.split('Bearer ').pop());
    } catch (e) {
      return false;
    }

    return !!x;
  }
}

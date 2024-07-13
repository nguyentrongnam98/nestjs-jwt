import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './auth.dto';

const fakeUser = [
  {
    username: 'admin1',
    password: 'admin1',
  },
  {
    username: 'admin2',
    password: 'admin2',
  },
];
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  validateUser(authPayload: AuthDto) {
    const user = fakeUser.find(
      (user) =>
        user.username === authPayload.username &&
        user.password === authPayload.password,
    );
    if (user) {
      const { password, ...result } = user;
      console.log(password);
      const sign = this.jwtService.sign(result);
      return {
        message: 'Login successful',
        token: sign,
      };
    }
    return null;
  }
}

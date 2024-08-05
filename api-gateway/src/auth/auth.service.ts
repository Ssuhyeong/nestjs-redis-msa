import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import AuthSigninDto from './dto/signin.dto';
import AuthSignupDto from './dto/signup.dto';
import { RefreshTokensDto } from './dto/refresh.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  public signin(authSigninDto: AuthSigninDto) {
    return this.authClient.send({ cmd: 'signin' }, authSigninDto);
  }

  public signup(authSignupDto: AuthSignupDto) {
    return this.authClient.send({ cmd: 'signup' }, authSignupDto);
  }

  public logout(userId: string) {
    return this.authClient.send({ cmd: 'logout' }, userId);
  }

  public refreshTokens(userId: string, refreshToken: string) {
    const refreshTokensDto: RefreshTokensDto = {
      userId,
      refreshToken,
    };

    return this.authClient.send({ cmd: 'refresh' }, refreshTokensDto);
  }
}

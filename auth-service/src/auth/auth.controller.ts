import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import AuthSigninDto from './dto/signin.dto';
import AuthSignupDto from './dto/signup.dto';
import { RefreshTokensDto } from './dto/refresh.dto';
import { Tokens } from './types/tokens.type';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'signin' })
  async signin(@Payload() authSigninDto: AuthSigninDto): Promise<Tokens> {
    return this.authService.signin(authSigninDto);
  }

  @MessagePattern({ cmd: 'signup' })
  async signup(@Payload() authSignupDto: AuthSignupDto): Promise<Tokens> {
    return this.authService.signup(authSignupDto);
  }

  @MessagePattern({ cmd: 'logout' })
  async logout(@Payload() userId: string) {
    return this.authService.logout(userId);
  }

  @MessagePattern({ cmd: 'refresh' })
  async refresh(refreshTokensDto: RefreshTokensDto) {
    return this.authService.refreshTokens(refreshTokensDto);
  }
}

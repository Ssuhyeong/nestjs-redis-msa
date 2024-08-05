import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import AuthSigninDto from './dto/signin.dto';
import AuthSignupDto from './dto/signup.dto';
import { RefreshTokensDto } from './dto/refresh.dto';
import * as argon2 from 'argon2';
import { Tokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  // `Signup` Route
  async signup(authSignupDto: AuthSignupDto): Promise<Tokens> {
    const password = await this.generateArgonHash(authSignupDto.password);

    try {
      const newUser = await this.prisma.user.create({
        data: {
          username: authSignupDto.username,
          password,
        },
      });

      const tokens: Tokens = await this.generateTokens(
        newUser.id,
        newUser.username,
      );

      await this.updateRefreshTokenHash(newUser.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Duplicate Username');
        }
      }
      throw error;
    }
  }

  // `SignIn` Route
  async signin(authSigninDto: AuthSigninDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: authSigninDto.username },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon2.verify(
      user.password,
      authSigninDto.password,
    );
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens: Tokens = await this.generateTokens(user.id, user.username);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
    return tokens;
  }

  // `Logout` Route
  async logout(userId: string): Promise<string> {
    try {
      const result = await this.prisma.user.updateMany({
        where: {
          id: userId,
          hashedRT: {
            not: null,
          },
        },
        data: {
          hashedRT: null,
        },
      });

      if (result.count > 0) {
        return 'Successfully logged out';
      } else {
        return 'Bad Request';
      }
    } catch (error) {
      console.error('Error during logout:', error);
      throw new ForbiddenException('Logout failed');
    }
  }

  // `RefreshToken` Route
  async refreshTokens(refreshTokensDto: RefreshTokensDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: refreshTokensDto.userId,
      },
    });

    if (!user || !user.hashedRT) throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await argon2.verify(
      user.hashedRT,
      refreshTokensDto.refreshToken,
    );

    if (!refreshTokenMatches)
      throw new ForbiddenException('refeshtoken invalidation');

    const tokens: Tokens = await this.generateTokens(user.id, user.username);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
    return tokens;
  }

  /* --- Utility Functions --- */

  async generateArgonHash(data: string): Promise<string> {
    return await argon2.hash(data);
  }

  async updateRefreshTokenHash(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const hash = await this.generateArgonHash(refreshToken);
    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRT: hash },
    });
  }

  async generateTokens(userId: string, username: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.config.get('JWT_ACCESS_TOKEN_SECRET_KEY'),
          expiresIn: this.config.get('ACCESS_TOKEN_LIFE_TIME') * 60,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.config.get('JWT_REFRESH_TOKEN_SECRET_KEY'),
          expiresIn: this.config.get('REFRESH_TOKEN_LIFE_TIME') * 24 * 60 * 60,
        },
      ),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}

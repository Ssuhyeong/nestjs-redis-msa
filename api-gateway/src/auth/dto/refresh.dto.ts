import { IsString, IsNotEmpty } from 'class-validator';

export class RefreshTokensDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

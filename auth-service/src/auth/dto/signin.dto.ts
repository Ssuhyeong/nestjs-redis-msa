import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, Length } from 'class-validator';
import xss from 'xss';

export default class AuthSigninDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  @Transform(({ value }) => xss(value.trim()))
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 20)
  @Transform(({ value }) => xss(value.trim()))
  password: string;
}

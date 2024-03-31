import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'Email должен быть в формате email@mail.xx',
    },
  )
  email: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  surname: string;

  @IsOptional()
  @MinLength(6, {
    message: 'Пароль должен быть длиннее 6 символов!',
  })
  @IsString()
  password: string;
}

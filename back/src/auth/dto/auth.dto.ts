import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail(
    {},
    {
      message: 'Email должен быть в формате email@mail.xx',
    },
  )
  email: string;

  @MinLength(6, {
    message: 'Пароль должен быть длиннее 6 символов!',
  })
  @IsString()
  password: string;
}

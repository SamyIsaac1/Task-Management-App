import { IsString, IsNotEmpty,IsNumber, MinLength, IsEmail } from 'class-validator';

export class RegisterDto {
  
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @IsString()
  gender: string;

  @IsNumber()
  age: number;
  
}

import { IsString, IsNotEmpty, IsNumber, IsOptional, MinLength, IsEmail} from 'class-validator';

export class User {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsOptional()
  gender: string;

  @IsNumber()
  @IsOptional()
  age: number;
}

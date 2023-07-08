import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './../Sevice/auth.service';
import { LoginDto } from './../dto/login.dto';
import { RegisterDto } from './../dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    try {
      const token = await this.authService.login(loginDto);
      return { token };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<{ token: string }> {
    try {
      const token = await this.authService.register(registerDto);
      return { token };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}

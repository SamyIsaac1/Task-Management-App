import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from './../dto/login.dto';
import { User } from './../Model/user.schema';
import { RegisterDto } from './../dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<string> {
    const { email, password } = loginDto;
    // Retrieve the user from the database
    const user = await this.userModel.findOne({ email });

    // If the user doesn't exist or the password is incorrect, throw an UnauthorizedException
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const token = this.jwtService.sign({ userId: user.id });

    return token;
  }

  async register(registerDto: RegisterDto): Promise<string> {
    const { name, email, password, gender, age } = registerDto;

    // Check if the email already exists
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      gender,
      age,
    });

    // Generate JWT token
    const token = this.jwtService.sign({ userId: newUser.id });

    return token;
  }
}

import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { UserService } from './../Sevice/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        throw new BadRequestException('Access Denied');
      }

      const token = authorizationHeader.split(' ')[1];

      const { userId } = this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY,
      });

      const user = await this.userService.findById(userId);

      if (!user) {
        throw new BadRequestException('Your email has not been found');
      }

      req['user'] = user; //// Store the authenticated user object in the request
      next();
    } catch (error) {
      next(error);
    }
  }
}

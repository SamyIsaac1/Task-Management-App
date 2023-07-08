import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { CreateTaskDto } from './../dto/create-task.dto';
import { LoginDto } from './../dto/login.dto';
import { RegisterDto } from './../dto/register.dto';
import { idParamDto } from './../dto/id.dto';

@Injectable()
export class ValidateTaskMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const createTaskDto = plainToClass(CreateTaskDto, req.body);
    const errors = validateSync(createTaskDto);

    if (errors.length > 0) {
      let errorMessage="";
      errors.forEach((e)=>{
        for(const key in e.constraints){
            errorMessage+=e.constraints[key]+" "
        }});
        
      throw new BadRequestException(errorMessage);
    }

    req.body = createTaskDto;
    next();
  }
}

export class ValidateLoginMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const loginDto = plainToClass(LoginDto, req.body);
    const errors = validateSync(loginDto);

    if (errors.length > 0) {
      let errorMessage="";
      errors.forEach((e)=>{
        for(const key in e.constraints){
            errorMessage+=e.constraints[key]
        }});
        
      throw new BadRequestException(errorMessage);
    }

    req.body = loginDto;
    next();
  }
}

export class ValidateRegisterMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const registerDto = plainToClass(RegisterDto, req.body);
    const errors = validateSync(registerDto);

    if (errors.length > 0) {
      let errorMessage="";
      errors.forEach((e)=>{
        for(const key in e.constraints){
            errorMessage+=e.constraints[key]
        }});
        
      throw new BadRequestException(errorMessage);
    }

    req.body = registerDto;
    next();
  }
}

export class ValidateIdParamsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const idDto = plainToClass(idParamDto, req.params);
    const errors = validateSync(idDto);

    if (errors.length > 0) {
      let errorMessage="";
      errors.forEach((e)=>{
        for(const key in e.constraints){
            errorMessage+=e.constraints[key]
        }});
        
      throw new BadRequestException(errorMessage);
    }
    
    next();
  }
}
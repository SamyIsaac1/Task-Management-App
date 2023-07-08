import { Controller, Get, NotFoundException } from '@nestjs/common';

@Controller('*') // Catch all routes
export class NotFoundController {
  @Get()
  notFound() {
    throw new NotFoundException('Route not found');
  }
}
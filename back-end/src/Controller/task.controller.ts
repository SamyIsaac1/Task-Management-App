// task.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TaskService } from './../Sevice/task.service';
import { Task } from './../Model/task.schema';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(@Req() req: Request): Promise<object> {
    try {
      const tasks = await this.taskService.findAll(req['user']._id);
      return { message: 'Done', data: tasks };
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

  @Get(':id')
  async findById(@Param('id') id: string): Promise<object> {
    try {
      const task = await this.taskService.findById(id);

      if (!task) {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }

      return { message: 'Done', data: task };
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

  @Post()
  async create(@Body() task: Task, @Req() req: Request) {
    try {
      task['createdBy'] = req['user']._id;
      const createdTask = await this.taskService.create(task);
      return { message: 'Created', data: createdTask };
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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() task: Task): Promise<object> {
    try {
      const updatedTask = await this.taskService.update(id, task);
      return { message: 'Updated', data: updatedTask };
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

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<object> {
    try {
      const deletedTask = await this.taskService.delete(id);
      return { message: 'Deleted', data: deletedTask };;
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

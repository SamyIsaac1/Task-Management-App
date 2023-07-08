// task.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './../Model/task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private readonly taskModel: Model<Task>) {}

  async findAll(userId: string): Promise<Task[]> {
    return this.taskModel.find({ createdBy: userId }).exec();
  }
  async findById(id: string): Promise<Task> {
    return this.taskModel.findById(id).exec();
  }

  async create(task: Task): Promise<Task> {
    const newTask = new this.taskModel(task);
    return newTask.save();
  }

  async update(id: string, task: Task): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, task, { new: true }).exec();
  }

  async delete(id: string): Promise<Task> {
    return this.taskModel.findByIdAndRemove(id).exec();
  }
}

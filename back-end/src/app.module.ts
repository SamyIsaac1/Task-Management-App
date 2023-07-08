import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { UserController } from './Controller/user.controller';
import { TaskController } from './Controller/task.controller';
import { AuthController } from './Controller/auth.controller';
import { UserService } from './Sevice/user.service';
import { TaskService } from './Sevice/task.service';
import { AuthService } from './Sevice/auth.service';
import { User, UserSchema } from './Model/user.schema';
import { Task, TaskSchema } from './Model/task.schema';
import {
  ValidateIdParamsMiddleware,
  ValidateLoginMiddleware,
  ValidateRegisterMiddleware,
  ValidateTaskMiddleware,
} from './Middleware/validation.middleware';
import { AuthMiddleware } from './Middleware/auth.middleware';
import { NotFoundController } from './Controller/not-found.controller';
config()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE, {
      useUnifiedTopology: true,
    } as any),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [
    UserController,
    TaskController,
    AuthController,
    NotFoundController,
  ],
  providers: [UserService, TaskService, AuthService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('auth/login', 'auth/register')
      .forRoutes('*');

    consumer
      .apply(ValidateLoginMiddleware)
      .forRoutes({ path: 'auth/login', method: RequestMethod.POST });

    consumer
      .apply(ValidateRegisterMiddleware)
      .forRoutes({ path: 'auth/register', method: RequestMethod.POST });

    consumer
      .apply(ValidateIdParamsMiddleware)
      .forRoutes({ path: 'tasks/:id', method: RequestMethod.GET });

    consumer
      .apply(ValidateTaskMiddleware)
      .forRoutes({ path: 'tasks', method: RequestMethod.POST });
  }
}

/**
Auth Routes:
  POST /auth/login 
  GET /auth/register
  
User Routes:
  GET /users - Get all users
  GET /users/:id - Get a user by ID
  POST /users - Create a new user
  PUT /users/:id - Update a user by ID
  DELETE /users/:id - Delete a user by ID

Task Routes:
  GET /tasks - Get all tasks
  GET /tasks/:id - Get a task by ID
  POST /tasks - Create a new task
  PUT /tasks/:id - Update a task by ID
  DELETE /tasks/:id - Delete a task by ID
  

*/

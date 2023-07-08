import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Task extends Document {
  @Prop()
  title: string;
  
  @Prop()
  status: string;

  @Prop()
  time_start: number;

  @Prop()
  time_end: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  createdBy: User['_id'];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
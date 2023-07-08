import { IsMongoId } from 'class-validator';

export class idParamDto {
  @IsMongoId()
  id: string;
}
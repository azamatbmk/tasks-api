import { IsEnum } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class MoveTaskDto {
  @IsEnum(TaskStatus)
  newStatus: TaskStatus;
}
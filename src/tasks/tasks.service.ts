import { Injectable } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './entities/task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository) private taskRepository: TasksRepository
    ) {}


    async createTask(createTaskDto: CreateTaskDto): Promise<Task>  {
        const task = this.taskRepository.create({
            ...createTaskDto,
            status: TaskStatus.TODO
        });

        return await this.taskRepository.save(task)
    }
}

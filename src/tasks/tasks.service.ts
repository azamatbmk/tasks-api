import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { Task, TaskStatus } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { MoveTaskDto } from './dto/move-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: TasksRepository,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      status: TaskStatus.TODO,
    });
    
    return await this.tasksRepository.save(task);
  }

  async getAllTasks(status?: TaskStatus): Promise<Task[]> {
    return await this.tasksRepository.findAllEithFilters(status);
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    
    return task;
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.getTaskById(id);
    
    Object.assign(task, updateTaskDto);
    task.updatedAt = new Date();
    
    return await this.tasksRepository.save(task);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async moveTask(id: number, moveTaskDto: MoveTaskDto): Promise<Task> {
    const task = await this.getTaskById(id);
    
    this.validateMoveRules(task.status, moveTaskDto.newStatus);
    
    task.status = moveTaskDto.newStatus;
    task.updatedAt = new Date();
    
    return await this.tasksRepository.save(task);
  }

  private validateMoveRules(currentStatus: TaskStatus, newStatus: TaskStatus): void {

    if (currentStatus === TaskStatus.DONE && newStatus === TaskStatus.TODO) {
      throw new BadRequestException(
        'Cannot move task from DONE back to TODO. Create a new task instead.'
      );
    }
  }
}
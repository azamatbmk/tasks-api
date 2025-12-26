import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Delete, 
  Body, 
  Param, 
  Query, 
  HttpCode, 
  HttpStatus,
  ParseIntPipe 
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { MoveTaskDto } from './dto/move-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
  
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('test')
    test() {
      return { 
        message: 'Tasks API with TypeORM is working!',
        timestamp: new Date().toISOString()
      };
}

  @Get()
  async getAllTasks(
    @Query('status') status?: TaskStatus
  ): Promise<Task[]> {
    return this.tasksService.getAllTasks(status);
  }

  @Get(':id')
  async getTaskById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Patch(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto
  ): Promise<Task> {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTask(
    @Param('id', ParseIntPipe) id: number
  ): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Post(':id/move')
  async moveTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() moveTaskDto: MoveTaskDto
  ): Promise<Task> {
    return this.tasksService.moveTask(id, moveTaskDto);
  }
}
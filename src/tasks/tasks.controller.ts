import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TaskController {
    constructor( private readonly taskService: TasksService) {}

    @Get(':id')
    async getTaskById(@Param('id', ParseIntPipe) id: string ) {
        
    }

};

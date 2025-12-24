import { Module } from '@nestjs/common';
import { TasksController } from './tasks/tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';
import { TasksRepository } from './tasks/tasks.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3000,
      username: 'tasks-api',
      password: '12345',
      database: 'task-database',
      entities: [__dirname + '/**/*.entity{.ts,js}'],
      synchronize: true
    }),
    TasksModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
})
export class AppModule {}

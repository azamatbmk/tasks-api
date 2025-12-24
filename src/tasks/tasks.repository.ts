import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Task, TaskStatus } from "./entities/task.entity";

@Injectable()
export class TasksRepository extends Repository<Task> {

    constructor( private dataSource: DataSource ) {
        super(Task, dataSource.createEntityManager());
    }

    async findAllEithFilters(status?: TaskStatus): Promise<Task[]> {
        const query = this.createQueryBuilder('task');

        if (status) {
            query.where('task.status = :status', { status })
        }

        return query.orderBy('task.created_at', 'DESC').getMany();
    }
}
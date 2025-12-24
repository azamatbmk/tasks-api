import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum TaskStatus {
    TODO = 'todo',
    IN_PROGRESS = 'in_progress',
    DONE = 'done'
}

@Entity('tasks')
export class Task {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    title: string;

    @Column({ type: 'text', nullable: true})
    description?: string;

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.TODO
    })
    status: TaskStatus;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAr: Date;
}

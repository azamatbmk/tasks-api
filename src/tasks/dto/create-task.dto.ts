import { IsOptional, IsString, Length } from "class-validator";
import { TaskStatus } from "../entities/task.entity";

export class CreateTaskDto {

    @IsString()
    @Length(1, 255)
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

}
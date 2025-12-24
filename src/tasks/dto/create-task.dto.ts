import { IsOptional, IsString, Length } from "class-validator";

export class CreateTaskDto {

    @IsString()
    @Length(1, 255)
    title: string;

    @IsString()
    @IsOptional()
    description?: string;
}
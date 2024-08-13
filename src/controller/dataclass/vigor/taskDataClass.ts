import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString, isBoolean } from "class-validator";
import { Moment } from "moment";

export class TaskCreateBody {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    taskName: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    taskDescription: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    taskType: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    taskBannerUrl: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    taskLogoUrl: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    taskExternalLink: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    taskCompletionStep: string;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    taskEarnPoint: number;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    taskTagType: string;

    @IsDefined()
    @IsNotEmpty()
    @Type(() => Date)
    taskStartDate: Moment;

    @IsDefined()
    @IsNotEmpty()
    @Type(() => Date)
    taskDeadlineDate: Moment;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    displayOrder: number;
}

export class TaskEditBody {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    taskName: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    taskDescription: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    taskType: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    taskBannerUrl: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    taskLogoUrl: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    taskExternalLink: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    taskCompletionStep: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    taskEarnPoint: number;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    taskTagType: string;

    @IsOptional()
    @IsNotEmpty()
    @Type(() => Date)
    taskStartDate: Moment;

    @IsOptional()
    @IsNotEmpty()
    @Type(() => Date)
    taskDeadlineDate: Moment;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    displayOrder: number;
}

export class TaskActivateBody {
    @IsDefined()
    @IsNotEmpty()
    @IsBoolean()
    @Type(() => Boolean)
    isActive: boolean;
}

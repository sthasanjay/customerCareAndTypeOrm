import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString, isBoolean } from "class-validator";
import { Moment } from "moment";


export class StoryUploadByUserBody {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    storyCaption: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    videoUrl: string;
}



export class StoryEditBody {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    storyDisplayCaption: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    displayOrder: number;

    @IsOptional()
    @IsNotEmpty()
    @Type(() => Date)
    storyDisplayFrom: Moment;

    @IsOptional()
    @IsNotEmpty()
    @Type(() => Date)
    storyDisplayUpto: Moment;
}

export class StoryApproveBody {
    @IsDefined()
    @IsNotEmpty()
    @IsBoolean()
    @Type(() => Boolean)
    isApproved: boolean;

    @IsDefined()
    @IsNotEmpty()
    @IsBoolean()
    @Type(() => Boolean)
    isActive: boolean;
}

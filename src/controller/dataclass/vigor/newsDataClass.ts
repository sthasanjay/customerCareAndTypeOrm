import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString, isBoolean } from "class-validator";
import { Moment } from "moment";

export class NewsCreateBody {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    newsTitle: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    newsType: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    description: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    shortDescription: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    bannerUrl: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    logoUrl: string;


    @IsDefined()
    @IsNotEmpty()
    @Type(() => Date)
    newsDisplayFrom: Moment;

    @IsDefined()
    @IsNotEmpty()
    @Type(() => Date)
    newsDisplayTo: Moment;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    displayOrder: number;

    @IsDefined()
    @IsNotEmpty()
    @IsBoolean()
    @Type(() => Boolean)
    isVisible: boolean;
}

export class NewsEditBody {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    newsTitle: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    newsType: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    description: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    shortDescription: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    bannerUrl: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    logoUrl: string;

    @IsOptional()
    @IsNotEmpty()
    @Type(() => Date)
    newsDisplayFrom: Moment;

    @IsOptional()
    @IsNotEmpty()
    @Type(() => Date)
    newsDisplayTo: Moment;


    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    displayOrder: number;

    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    @Type(() => Boolean)
    isVisible: boolean;
}

export class NewsActivateBody {
    @IsDefined()
    @IsNotEmpty()
    @IsBoolean()
    @Type(() => Boolean)
    isActive: boolean;
}

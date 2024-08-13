import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString, isBoolean } from "class-validator";
import { Moment } from "moment";

export class EventCreateBody {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    eventName: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    eventDescription: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    eventDisplayDate: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    eventDisplayTime: string;

    @IsDefined()
    @IsNotEmpty()
    @Type(() => Date)
    eventDate: Moment;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    eventDisplayLocation: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    eventGoogleMapUrl: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    eventBannerUrl: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    eventLogoUrl: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    eventTagType: string;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    displayOrder: number;

    @IsDefined()
    @IsNotEmpty()
    @IsBoolean()
    @Type(() => Boolean)
    isSuggestedEvent: boolean;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    suggestedOrder: number;
}

export class EventEditBody {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    eventName: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    eventDescription: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    eventDisplayDate: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    eventDisplayTime: string;

    @IsOptional()
    @IsNotEmpty()
    @Type(() => Date)
    eventDate: Moment;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    eventDisplayLocation: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    eventGoogleMapUrl: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    eventBannerUrl: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    eventLogoUrl: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    eventTagType: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    displayOrder: number;

    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    @Type(() => Boolean)
    isSuggestedEvent: boolean;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    suggestedOrder: number;
}

export class EventActivateBody {
    @IsDefined()
    @IsNotEmpty()
    @IsBoolean()
    @Type(() => Boolean)
    isActive: boolean;
}

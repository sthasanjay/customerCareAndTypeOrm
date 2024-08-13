import { Type } from "class-transformer";
import { IsBoolean, IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString, isBoolean } from "class-validator";

export class CityCreateBody {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    cityName: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    cityShortName: string;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    displayOrder: number;
}

export class CityEditBody {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    cityName: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    cityShortName: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    displayOrder: number;
}

export class CityActivateBody {
    @IsDefined()
    @IsNotEmpty()
    @IsBoolean()
    @Type(() => Boolean)
    isActive: boolean;
}

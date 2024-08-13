import { Type } from "class-transformer";
import { IsBoolean, IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString, isBoolean } from "class-validator";

export class PostalCodeCreateBody {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    postalCode: string;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    displayOrder: number;
}

export class PostalCodeEditBody {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    postalCode: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    displayOrder: number;
}

export class PostalCodeActivateBody {
    @IsDefined()
    @IsNotEmpty()
    @IsBoolean()
    @Type(() => Boolean)
    isActive: boolean;
}

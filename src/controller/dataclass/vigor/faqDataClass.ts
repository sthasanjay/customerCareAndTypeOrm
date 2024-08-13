import { Type } from "class-transformer";
import { IsBoolean, IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString, isBoolean } from "class-validator";

export class FAQCreateBody {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    subject: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    question: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    answer: string;

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

export class FAQEditBody {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    subject: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    question: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    answer: string;

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

export class FAQActivateBody {
    @IsDefined()
    @IsNotEmpty()
    @IsBoolean()
    @Type(() => Boolean)
    isActive: boolean;
}

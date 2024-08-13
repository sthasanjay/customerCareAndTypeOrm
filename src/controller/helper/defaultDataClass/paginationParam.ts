import { Type } from "class-transformer";
import { IsBoolean, IsDefined, IsInt, IsNumber, IsString, IsOptional, IsEnum } from "class-validator";
import { WebPageType } from "entity/commonWebPage/webPageModel";

export class PaginationQueryFilter {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  public limit: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  public page: number;
}

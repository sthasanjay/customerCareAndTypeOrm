import { Transform, Type } from "class-transformer";
import { IsBoolean, IsDefined, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EmailTemplateCreateBody {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @Transform(({ value }) => value.trim(), { toClassOnly: true })
  templateName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  emailDescription: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  subject: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @Transform(({ value }) => value.trim(), { toClassOnly: true })
  emailTitle: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  emailContent: string;
}

export class ActivateBody {
  @IsDefined()
  @IsNotEmpty()
  @IsBoolean()
  @Type(() => Boolean)
  isActive: boolean;
}

export class EmailTemplateEditBody {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @Transform(({ value }) => value.trim(), { toClassOnly: true })
  templateName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  emailDescription: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @Transform(({ value }) => value.trim(), { toClassOnly: true })
  slug: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  subject: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @Transform(({ value }) => value.trim(), { toClassOnly: true })
  emailTitle: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  emailContent: string;
}

export class EmailHTMLTemplateCreateBody {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  templateHTMLName: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  emailHTMLContent: string;
}

export class EmailHTMLTemplateEditBody {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  templateHTMLName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  emailHTMLContent: string;
}

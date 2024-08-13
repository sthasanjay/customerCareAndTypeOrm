import { Type } from "class-transformer";
import { IsDefined, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserRole } from "entity/enum/websiteRoles";

export class UserCreateBody {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @Type(() => String)
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  password: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  phoneNumber: string;
}

export class WebsiteUserEditBody {
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  @Type(() => String)
  email: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsEnum(UserRole)
  @Type(() => String)
  userRole: UserRole;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  phoneNumber: string;
}

export class UserLoginBody {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @Type(() => String)
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  password: string;
}

export class AdminUserLoginBody {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @Type(() => String)
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  password: string;
}


import { StudentUser } from "entity/vigor/studentUserModel";
import { AdminUser } from "entity/vigor/adminUserModel";
import { ClassType } from "class-transformer-validator";

export type User = StudentUser | AdminUser;
export type UserEntity = ClassType<User>;




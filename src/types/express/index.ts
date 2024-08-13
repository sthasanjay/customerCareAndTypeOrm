// @ts-ignore
import { Request } from "express";
import { User as user } from "types/userEntity";

declare global {
  namespace Express {
    interface Request {
      user?: user;
    }
  }
}

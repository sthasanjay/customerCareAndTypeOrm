import { User as user } from "../userEntity";

declare global {
  namespace Express {
    interface Request {
      user?: user;
    }
  }
}

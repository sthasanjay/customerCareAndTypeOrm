import { NextFunction, Request, Response } from "express";
import { AppError } from "utils/appError";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import { AppDataSource } from "data-source";
import axios from "axios";
import { AdminRole } from "entity/enum/adminRoleEnum";
import { StudentUser } from "entity/vigor/studentUserModel";
import { AdminUser } from "entity/vigor/adminUserModel";
import { ROLE } from "entity/enum/role";


export function protect() {
  return async (req: Request, res: Response, next: NextFunction) => {
    // 1) Getting token and check of it's there
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new AppError("You are not logged in! Please log in to get access.", 401));
    }

    // 2) Verification token
    const decoded = await promisify<string, string, any>(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const studentUserRepository = AppDataSource.getRepository(StudentUser);

    req.user = await studentUserRepository.findOneBy({
      id: decoded.id,
    });

    if (!req.user || !req.user.isActive) {
      return next(new AppError("This user account is deactivated or does not exist.", 411));
    }

    next();
  };
}

export function adminProtect() {
  return async (req: Request, res: Response, next: NextFunction) => {
    // 1) Getting token and check of it's there
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new AppError("You are not logged in! Please log in to get access.", 401));
    }

    // 2) Verification token
    const decoded = await promisify<string, string, any>(jwt.verify)(token, process.env.JWT_SECRET);

    console.log("auth decoded", decoded);


    // 3) Check if user still exists
    const adminUserRepository = AppDataSource.getRepository(AdminUser);

    req.user = await adminUserRepository.findOneBy({
      id: decoded.id,
    });

    if (!req.user) {
      return next(new AppError("This user account is deactivated or does not exist.", 411));
    }

    //console.log("from portect", req.user)
    next();
  };
}

export function restrictTo(...roles: ROLE[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role as ROLE)) {
      return next(new AppError("You do not have permission to perform this action", 403));
    }
    next();
  };
}



export function verifyCaptcha(req: Request, res: Response, next: NextFunction) {
  const secretKey = process.env.CAPTCHA_KEY;
  if (!secretKey) {
    return next(new AppError("Secret key for captcha not provided.", 400));
  }
  const token = req.body.token;
  if (!token) {
    return next(new AppError("Captcha token not provided .", 400));
  }
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  const options = {
    headers: { "content-type": "application/x-www-form-urlencoded" },
  };
  axios
    .post(url, {}, options)
    .then((response) => {
      console.log("captcha log");
      console.log(response.data.score);
      if (!(response.data.success && response.data.score ? response.data.score >= 0.5 : false)) {
        const score = response.data["score"];
        const errors = response.data["error-codes"];
        return next(
          new AppError(
            `Captcha verification failed - score:${score ? score : ""}, reasons: ${errors ? errors : ""}`,
            400
          )
        );
      }
      next();
    })
    .catch((error) => {
      return next(new AppError(error, 400));
    });
}

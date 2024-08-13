import { NextFunction, Request, Response } from "express";
import { AppError } from "utils/appError";
import { validateBodyInput } from "helpers/controller/validator";
import { QueryFilter } from "helpers/controller/queryFilter";
import { autoInjectable } from "tsyringe";
import jwt from "jsonwebtoken";
import { AdminUserLoginBody, UserCreateBody, UserLoginBody } from "../../dataclass/vigor/websiteUserDataClass";
import bcrypt from "bcryptjs";
import { AdminUser } from "entity/vigor/adminUserModel";
import { AdminUserDao } from "dao/vigor/adminUserDao";
import { StudentUserDao } from "dao/vigor/userDao";
import { User } from "types/userEntity";

@autoInjectable()
export class AuthController extends QueryFilter<AdminUser> {
  public override entity = AdminUser;

  constructor(private userDao?: StudentUserDao, private adminUserDao?: AdminUserDao) {
    super();
  }

  //Generate a token using JWT
  //@return token
  signToken = (id: string) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };

  //Generate a admin token using JWT
  //@return token
  adminSignToken = (id: string) => {
    return jwt.sign({ id: id }, process.env.ADMIN_JWT_SECRET, {
      expiresIn: process.env.ADMIN_JWT_EXPIRES_IN,
    });
  };

  //Return token response
  createSendToken = (user: User, statusCode: number, res: Response) => {
    const token = this.signToken(user.id);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
      status: "success",
      data: {
        token,
        user,
      },
    });
  };

  //Return admin token response
  createSendAdminToken = (user: AdminUser, statusCode: number, res: Response) => {
    const token = this.signToken(user.id);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
      status: "success",
      data: {
        token,
        user,
      },
    });
  };

  /*
        @desc POST SignUp
        @route POST /api/v1/users/signup
        @access private
    **/
  signUp = async (req: Request, res: Response, next: NextFunction) => {
    const { result: validBody, errors } = await validateBodyInput(req, UserCreateBody);
    if (errors) return res.status(400).json(errors);

   

    // Hash the password with cost of 12
    // validBody.password = await bcrypt.hash(validBody.password, 12);


    // const newUser = await this.userDao.repository.save({ ...validBody });

    // this.createSendToken(newUser, 201, res);
  };

  /* 
        @desc Post Login
        @route POST /api/v1/users/login
        @access private
    **/
  login = async (req: Request, res: Response, next: NextFunction) => {
    const { result: validBody, errors } = await validateBodyInput(req, UserLoginBody);
    if (errors) return res.status(400).json(errors);

    // 2) Check if user exists && password is correct

    const user: User = await this.userDao.repository.findOne({
      where: {
        email: validBody.email,
      },
      select: ["email", "password", "phoneNumber"],
    });

    if (!user || !(await bcrypt.compare(validBody.password, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }

    // 3) If everything ok, send token to client
    this.createSendToken(user, 200, res);
  };

  /* 
       @desc Post Login
       @route POST /api/v1/users/adminlogin
       @access private
   **/
  adminLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { result: validBody, errors } = await validateBodyInput(req, AdminUserLoginBody);
    if (errors) return res.status(400).json(errors);

    // 2) Check if user exists && password is correct

    const adminUser: AdminUser = await this.adminUserDao.repository.findOne({
      where: {
        email: validBody.email,
      },
      select: ["email", "password", ],
    });

    if (!adminUser || !(await bcrypt.compare(validBody.password, adminUser.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }

    // 3) If everything ok, send token to client
    this.createSendAdminToken(adminUser, 200, res);
  };

}

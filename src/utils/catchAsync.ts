import { NextFunction, Request, Response } from "express";

/*
  For cathcing errors from async functions
*/
export const catchAsync = (fn: any) => {
	return (req: Request, res: Response, next: NextFunction) => {
		fn(req, res, next).catch(next);
	};
};

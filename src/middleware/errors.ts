// * Has not Side Effects like other middlewares

import { NextFunction, Request, Response } from "express";

declare type WebError = Error & { status?: string } & { statusCode?: number };
export const errorHandler = (err: WebError, req: Request, res: Response, next: NextFunction): void => {
  if (res.headersSent) return next(err);

  err.statusCode = err?.statusCode || 500;
  err.status = err?.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

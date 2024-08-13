export class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;
    constructor(message: string, statusCode: number, errorCode?: string) {
      switch (errorCode) {
        case "23505":
          message = "There is a unique constraint violation";
          super(message);
          break;
        case "P2003":
          message = "Foreign key constraint failed on the field";
          super(message);
          break;
        case "P2004":
          message = "A constraint failed on the database";
          super(message);
          break;
        case "P2005":
          message =
            "The value stored in the database for the field is invalid for the field's type";
          super(message);
          break;
        case "P2006":
          message = "The provided value for field is not valid";
          super(message);
          break;
        case "P2011":
          message = "Null constraint violation ";
          super(message);
          break;
        default:
          super(message);
      }
  
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
      this.isOperational = true;
      
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
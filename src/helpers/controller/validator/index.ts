import { Request } from "express";
import { isNumberString, validate, ValidationError } from "class-validator";

import { ClassType } from "class-transformer-validator";
import { plainToInstance } from "class-transformer";

export interface ValidationErrorResponse {
  validationErrors?: ValidationError[];
}

export interface ValidationResult<T> {
  result?: T;
  errors?: ValidationErrorResponse;
}

async function validateBodyInput<T>(
  request: Request,
  convertToType: ClassType<T>
): Promise<ValidationResult<T>> {
  const convertedBody = convertBody(request, convertToType);
  return _validate(convertedBody);
}

async function validateNormalObject<T>(
  normalObject: object,
  convertToType: ClassType<T>
): Promise<ValidationResult<T>> {
  const convertedBody = plainToInstance(convertToType, normalObject, { exposeUnsetFields: true });
  return _validate(convertedBody);
}

async function validateQueryInput<T>(
  request: Request,
  convertToType: ClassType<T>
): Promise<ValidationResult<T>> {
  const convertedQuery = convertQuery(request, convertToType);
  return _validate(convertedQuery);
}

// function validateIdParam(request: Request): number {
//   return validateNumericParam(request, "id");
// }

function validateNumericParam(request: Request, paramName: string): string {
  const paramValue = request.params[paramName];
  return isNumberString(paramValue) ? paramValue : "0";
}

function validateNumericParamInteger(request: Request, paramName: string): number {
  const paramValue = request.params[paramName];
  return isNumberString(paramValue) ? parseInt(paramValue) : 0;
}

function convertBody<T>(request: Request, toType: ClassType<T>): T {
  return convert(request.body, toType);
}

function convertQuery<T>(request: Request, toType: ClassType<T>): T {
  return convert(request.query, toType);
}

function convert<T>(object: any, toType: ClassType<T>): T {
  return plainToInstance(toType, object, { exposeUnsetFields: true });
}

async function _validate<T>(obj: T): Promise<ValidationResult<T>> {
  const validationErrors = await validate(obj as unknown as object, { whitelist: true });
  if (validationErrors.length === 0) {
    return { result: obj };
  }
  const response: ValidationErrorResponse = { validationErrors };
  return { errors: response };
}

export {
  validateBodyInput,
  validateQueryInput,
  validateNumericParam,
  validateNormalObject,
  validateNumericParamInteger,
};

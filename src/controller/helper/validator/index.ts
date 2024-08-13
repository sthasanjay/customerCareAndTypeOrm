import { Request } from "express";
import { isNumberString, validate, ValidationError, Validator } from "class-validator";

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

async function validateQueryInput<T>(
  request: Request,
  convertToType: ClassType<T>
): Promise<ValidationResult<T>> {
  const convertedQuery = convertQuery(request, convertToType);
  return _validate(convertedQuery);
}

function validateIdParam(request: Request): number {
  return validateNumericParam(request, "id");
}

function validateNumericParam(request: Request, paramName: string, radix: number = 10): number {
  const paramValue = request.params[paramName];
  const numericValue: number = isNumberString(paramValue) ? parseInt(paramValue, radix) : NaN;
  return numericValue;
}

function convertBody<T>(request: Request, toType: ClassType<T>): T {
  return convert(request.body, toType);
}

function convertQuery<T>(request: Request, toType: ClassType<T>): T {
  return convert(request.query, toType);
}

function convert<T>(object: any, toType: ClassType<T>): T {
  return plainToInstance(toType, object);
}

async function _validate<T>(obj: T): Promise<ValidationResult<T>> {
  const validationErrors = await validate(obj as Object, { whitelist: true });
  if (validationErrors.length === 0) {
    return { result: obj };
  }
  const response: ValidationErrorResponse = { validationErrors };
  return { errors: response };
}

export { validateBodyInput, validateQueryInput, validateIdParam, validateNumericParam };

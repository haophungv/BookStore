import { NextFunction, Request, Response } from "express";
var HttpStatus = require("http-status-codes");

export class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string, readonly extra?: object) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
export class NotFoundException extends HttpException {
  constructor(extra?: object) {
    super(HttpStatus.NOT_FOUND, "Requested resource was not found", extra);
  }
}

export class InternalErrorException extends HttpException {
  constructor(extra?: object) {
    super(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "An internal server error occurred, please contact support",
      extra
    );
  }
}

export class UnauthorizedErrorException extends HttpException {
  constructor(extra?: object) {
    super(
      HttpStatus.UNAUTHORIZED,
      "Not authorized to access requested resource",
      extra
    );
  }
}

export const errorHandling = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  return res.status(status).send({
    status,
    message,
  });
};

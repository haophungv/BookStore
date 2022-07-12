"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandling = exports.UnauthorizedErrorException = exports.InternalErrorException = exports.NotFoundException = exports.HttpException = void 0;
var HttpStatus = require("http-status-codes");
class HttpException extends Error {
    constructor(status, message, extra) {
        super(message);
        this.extra = extra;
        this.status = status;
        this.message = message;
    }
}
exports.HttpException = HttpException;
class NotFoundException extends HttpException {
    constructor(extra) {
        super(HttpStatus.NOT_FOUND, "Requested resource was not found", extra);
    }
}
exports.NotFoundException = NotFoundException;
class InternalErrorException extends HttpException {
    constructor(extra) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, "An internal server error occurred, please contact support", extra);
    }
}
exports.InternalErrorException = InternalErrorException;
class UnauthorizedErrorException extends HttpException {
    constructor(extra) {
        super(HttpStatus.UNAUTHORIZED, "Not authorized to access requested resource", extra);
    }
}
exports.UnauthorizedErrorException = UnauthorizedErrorException;
const errorHandling = (error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    return res.status(status).send({
        status,
        message,
        extra: error === null || error === void 0 ? void 0 : error.extra,
    });
};
exports.errorHandling = errorHandling;
//# sourceMappingURL=exception.js.map
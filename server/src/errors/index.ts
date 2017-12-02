
export class BaseError extends Error {
    public data;
    constructor(message, data?) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.data = data;
    }
}

export class ApplicationError extends BaseError {

}

export class UnexpectedError extends BaseError {

}

export class ItemNotFoundError extends ApplicationError {

}

export class ValidationError extends ApplicationError {
    public static fromJoi(error: { message: string, details: any }) {
        return new ValidationError(error.message, error.details);
    }
}

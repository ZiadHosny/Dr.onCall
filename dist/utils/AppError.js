export class AppError extends Error {
    statusCode = 500;
    details;
    constructor(message, statusCode, details) {
        super(message);
        this.statusCode = statusCode ?? 500;
        this.details = details;
    }
}
export class AppLocalizedError extends Error {
    statusCode = 500;
    details;
    localizedMessage;
    constructor(message, statusCode, details) {
        super(message.en);
        this.localizedMessage = message;
        this.statusCode = statusCode ?? 500;
        this.details = details;
    }
}

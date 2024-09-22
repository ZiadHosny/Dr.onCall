import { ErrorRequestHandler } from "express";
import { LangType } from "./types.js";

export interface AppErrorType extends ErrorRequestHandler {
    localizedMessage: LangType,
    details?: any,
    statusCode: number,
}

export class AppError extends Error {
    statusCode: number = 500
    details: any;
    constructor(message: string, statusCode: number, details?: any) {
        super(message)
        this.statusCode = statusCode ?? 500
        this.details = details
    }
}

export class AppLocalizedError extends Error {
    statusCode: number = 500
    details: any;
    localizedMessage: LangType;
    constructor(message: LangType, statusCode?: number, details?: any) {
        super(message.en)
        this.localizedMessage = message
        this.statusCode = statusCode ?? 500
        this.details = details
    }
}
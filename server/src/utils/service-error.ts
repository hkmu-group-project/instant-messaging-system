import type { JsonResponse, JsonResponseError } from "@jderstd/hono/response";

class ServiceError extends Error {
    protected code: string = "";
    protected path: string[] = [];

    constructor(code: string) {
        super(code);
        this.setCode(code);
    }

    public setCode(code: string): void {
        this.code = code;
    }

    public getCode(): string {
        return this.code;
    }

    public setPath(path: string[]): void {
        this.path = path;
    }

    public getPath(): string[] {
        return this.path;
    }

    public setMessage(message: string): void {
        this.message = message;
    }

    public getMessage(): string {
        return this.message;
    }

    public toJsonResponseError(): JsonResponseError {
        return {
            code: this.getCode(),
            path: this.getPath(),
            message: this.getMessage(),
        };
    }

    public toJsonResponse(): JsonResponse {
        return {
            success: false,
            errors: [
                this.toJsonResponseError(),
            ],
        };
    }
}

export { ServiceError };

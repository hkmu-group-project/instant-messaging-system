// This is a TypeScript template.

import type { Request, Response } from "express";

import { createJsonResponse } from "@jderstd/express";
import { Router } from "express";

const tsRouter: Router = Router();

tsRouter.get("/", async (_req: Request, res: Response): Promise<void> => {
    createJsonResponse(res, {
        data: {
            message: "Hello, TypeScript!",
        },
    });
});

export { tsRouter };

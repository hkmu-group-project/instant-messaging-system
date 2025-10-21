// This is a JavaScript template.

import { createJsonResponse } from "@jderstd/express";
import { Router } from "express";

const jsRouter = Router();

jsRouter.get("/", (_req, res) => {
    createJsonResponse(res, {
        data: {
            message: "Hello, JavaScript!",
        },
    });
});

export { jsRouter };

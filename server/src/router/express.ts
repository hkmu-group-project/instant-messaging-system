import type { Express, Request, Response } from "express";

import type { HealthInfo } from "#/modules/health/service";

import { createJsonResponse } from "@jderstd/express";
import express from "express";
import { toFetchHandler } from "srvx/node";

import { serviceHealth } from "#/modules/health/service";

const app: Express = express();

app.use(express.json());

app.get("/", async (_req: Request, res: Response): Promise<Response> => {
    return createJsonResponse(res);
});

app.get("/health", async (_req: Request, res: Response): Promise<Response> => {
    const data: HealthInfo = await serviceHealth();

    return createJsonResponse(res, {
        data,
    });
});

// @ts-expect-error
const expressHandler = toFetchHandler(app);

export { expressHandler };

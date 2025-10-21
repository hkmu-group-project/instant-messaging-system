import type { Request, Response } from "express";

import type { HealthInfo } from "#/modules/health/service";

import { createJsonResponse } from "@jderstd/express";
import { Router } from "express";

import { serviceHealth } from "#/modules/health/service";
import { jsRouter } from "#/router/javascript";
import { tsRouter } from "#/router/typescript";

const router: Router = Router();

router.get("/", async (_req: Request, res: Response): Promise<void> => {
    createJsonResponse(res);
});

router.get("/health", async (_req: Request, res: Response): Promise<void> => {
    const data: HealthInfo = await serviceHealth();

    createJsonResponse(res, {
        data,
    });
});

router.use("/js", jsRouter);

router.use("/ts", tsRouter);

export { router };

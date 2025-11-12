import type { Context } from "hono";

import { createJsonResponse } from "@jderstd/hono/response";
import {
    describeRoute,
    openAPIRouteHandler,
    resolver,
} from "@jderstd/hono-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { Hono } from "hono";

import {
    createJsonSuccessResponseSchema,
    jsonResponseSchema,
} from "#/@types/zod";
import { healthInfoSchema } from "#/modules/health/service";
import { routerAuth } from "#/router/auth";
import { healthHandler } from "#/router/health";
import { routerUser } from "#/router/user";

const router: Hono = new Hono();

router.get(
    "/",
    describeRoute({
        responses: {
            200: {
                description: "Successful response",
                content: {
                    "application/json": {
                        schema: resolver(jsonResponseSchema),
                    },
                },
            },
        },
    }),
    async (c: Context): Promise<Response> => {
        return createJsonResponse(c);
    },
);

router.get(
    "/health",
    describeRoute({
        responses: {
            200: {
                description: "Successful response",
                content: {
                    "application/json": {
                        schema: resolver(
                            createJsonSuccessResponseSchema(healthInfoSchema),
                        ),
                    },
                },
            },
        },
    }),
    async (c: Context): Promise<Response> => {
        return await healthHandler(c.req.raw);
    },
);

router.route("/auth", routerAuth);

router.route("/user", routerUser);

router.get(
    "/openapi.json",
    openAPIRouteHandler(router, {
        documentation: {
            info: {
                title: "Instant Messaging System API",
                version: "1.0.0",
                description: "API for Instant Messaging System",
            },
        },
    }),
);

router.get(
    "/openapi",
    Scalar({
        theme: "default",
        url: "/openapi.json",
    }),
);

export { router };

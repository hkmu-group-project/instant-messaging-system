import type { WithStringId } from "#/@types/schema";
import type { ProtectedUser } from "#/modules/user/schema";

import { createJsonResponse } from "@jderstd/hono/response";
import { describeRoute, resolver, validator } from "@jderstd/hono-openapi";
import { Hono } from "hono";
import z from "zod";

import {
    createJsonFailureResponseSchema,
    createJsonResponseErrorSchema,
    createJsonSuccessResponseSchema,
} from "#/@types/zod";
import {
    ServiceUserFindErrorCode,
    ServiceUserFindErrorMessage,
    serviceUserFind,
} from "#/modules/user/services/find";
import { routerErrorHandler } from "#/utils/service-error";

const router: Hono = new Hono();

const findUserQuery = z.object({
    id: z.optional(z.string()),
    name: z.optional(z.string()),
});

const protectedUserWithStringIdSchema = z.object({
    id: z.string(),
    name: z.string(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
});

router.get(
    "/",
    validator("query", findUserQuery),
    describeRoute({
        operationId: "findUser",
        responses: {
            200: {
                description: "Successful response",
                content: {
                    "application/json": {
                        schema: resolver(
                            createJsonSuccessResponseSchema(
                                protectedUserWithStringIdSchema,
                            ),
                        ),
                    },
                },
            },
            400: {
                description: "Missing ID or name",
                content: {
                    "application/json": {
                        schema: resolver(
                            createJsonFailureResponseSchema(
                                createJsonResponseErrorSchema(
                                    z.literal(ServiceUserFindErrorCode.MISSING),
                                    z.literal(
                                        ServiceUserFindErrorMessage.MISSING,
                                    ),
                                ),
                            ),
                        ),
                    },
                },
            },
            404: {
                description: "User not found",
                content: {
                    "application/json": {
                        schema: resolver(
                            createJsonFailureResponseSchema(
                                createJsonResponseErrorSchema(
                                    z.literal(
                                        ServiceUserFindErrorCode.NOT_FOUND,
                                    ),
                                    z.literal(
                                        ServiceUserFindErrorMessage.NOT_FOUND,
                                    ),
                                ),
                            ),
                        ),
                    },
                },
            },
            500: {
                description: "Unknown error",
                content: {
                    "application/json": {
                        schema: resolver(
                            createJsonFailureResponseSchema(
                                createJsonResponseErrorSchema(
                                    z.literal(ServiceUserFindErrorCode.UNKNOWN),
                                    z.literal(
                                        ServiceUserFindErrorMessage.UNKNOWN,
                                    ),
                                ),
                            ),
                        ),
                    },
                },
            },
        },
    }),
    async ({ req }): Promise<Response> => {
        try {
            const { id, name } = req.valid("query");

            const user: WithStringId<ProtectedUser> = await serviceUserFind({
                id,
                name,
            });

            return createJsonResponse({
                data: user,
            });
        } catch (err: unknown) {
            return routerErrorHandler(err);
        }
    },
);

export { router as routerUser };

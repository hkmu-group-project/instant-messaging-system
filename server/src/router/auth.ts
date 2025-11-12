import { createJsonResponse } from "@jderstd/hono/response";
import { describeRoute, resolver, validator } from "@jderstd/hono-openapi";
import { Hono } from "hono";
import { z } from "zod";

import {
    createJsonFailureResponseSchema,
    createJsonResponseErrorSchema,
    createJsonSuccessResponseSchema,
    jsonResponseSchema,
} from "#/@types/zod";
import {
    ServiceUserLoginErrorCode,
    ServiceUserLoginErrorMessage,
    type ServiceUserLoginResult,
    serviceUserLogin,
} from "#/modules/user/services/auth/login";
import {
    ServiceUserRegisterErrorCode,
    ServiceUserRegisterErrorMessage,
    serviceUserRegister,
} from "#/modules/user/services/auth/register";
import { routerErrorHandler } from "#/utils/service-error";

const router: Hono = new Hono();

const registerJson = z.object({
    name: z.string(),
    password: z.string(),
});

router.post(
    "/register",
    validator("json", registerJson),
    describeRoute({
        operationId: "register",
        responses: {
            200: {
                description: "Successful response",
                content: {
                    "application/json": {
                        schema: resolver(jsonResponseSchema),
                    },
                },
            },
            409: {
                description: "User already exists",
                content: {
                    "application/json": {
                        schema: resolver(
                            createJsonFailureResponseSchema(
                                createJsonResponseErrorSchema(
                                    z.literal(
                                        ServiceUserRegisterErrorCode.DUPLICATE,
                                    ),
                                    z.literal(
                                        ServiceUserRegisterErrorMessage.DUPLICATE,
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
                                    z.literal(
                                        ServiceUserRegisterErrorCode.UNKNOWN,
                                    ),
                                    z.literal(
                                        ServiceUserRegisterErrorMessage.UNKNOWN,
                                    ),
                                ),
                            ),
                        ),
                    },
                },
            },
        },
    }),
    async (c): Promise<Response> => {
        try {
            const { name, password } = c.req.valid("json");

            await serviceUserRegister({
                name,
                password,
            });

            return createJsonResponse(c);
        } catch (err: unknown) {
            return routerErrorHandler(err);
        }
    },
);

const loginResultSchema = z.object({
    id: z.string(),
    name: z.string(),
    access: z.string(),
    refresh: z.string(),
});

router.post(
    "/login",
    validator("json", registerJson),
    describeRoute({
        operationId: "login",
        responses: {
            200: {
                description: "Successful response",
                content: {
                    "application/json": {
                        schema: resolver(
                            createJsonSuccessResponseSchema(loginResultSchema),
                        ),
                    },
                },
            },
            401: {
                description: "Invalid username of password",
                content: {
                    "application/json": {
                        schema: resolver(
                            createJsonFailureResponseSchema(
                                createJsonResponseErrorSchema(
                                    z.literal(
                                        ServiceUserLoginErrorCode.INVALID,
                                    ),
                                    z.literal(
                                        ServiceUserLoginErrorMessage.INVALID,
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
                                    z.literal(
                                        ServiceUserLoginErrorCode.UNKNOWN,
                                    ),
                                    z.literal(
                                        ServiceUserLoginErrorCode.UNKNOWN,
                                    ),
                                ),
                            ),
                        ),
                    },
                },
            },
        },
    }),
    async (c): Promise<Response> => {
        try {
            const { name, password } = c.req.valid("json");

            const data: ServiceUserLoginResult = await serviceUserLogin({
                name,
                password,
            });

            return createJsonResponse<ServiceUserLoginResult>(c, {
                data,
            });
        } catch (err: unknown) {
            return routerErrorHandler(err);
        }
    },
);

export { router as routerAuth };

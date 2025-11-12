import type { WithId } from "mongodb";
import type { Format } from "ts-vista";

import type { User } from "#/modules/user/schema";

import { verify } from "@node-rs/argon2";
import { sign } from "hono/jwt";

import { ACCESS_SECRET, REFRESH_SECRET } from "#/constants";
import { findUserByName } from "#/modules/user/sql";
import { ServiceError } from "#/utils/service-error";

type ServiceUserLoginOptions = Format<Pick<User, "name" | "password">>;

type ServiceUserLoginResult = {
    id: string;
    name: string;
    refresh: string;
    access: string;
};

enum ServiceUserLoginErrorCode {
    INVALID = "invalid",
    UNKNOWN = "unknown",
}

enum ServiceUserLoginErrorMessage {
    INVALID = "Invalid username or password",
    UNKNOWN = "Unknown error",
}

const getLoginErrorMessage = (
    code: ServiceUserLoginErrorCode,
): ServiceUserLoginErrorMessage => {
    switch (code) {
        case ServiceUserLoginErrorCode.INVALID:
            return ServiceUserLoginErrorMessage.INVALID;
        case ServiceUserLoginErrorCode.UNKNOWN:
            return ServiceUserLoginErrorMessage.UNKNOWN;
    }
};

const serviceUserLogin = async (
    options: ServiceUserLoginOptions,
): Promise<ServiceUserLoginResult> => {
    try {
        // find user

        const user: WithId<User> | null = await findUserByName(options.name);

        if (!user) {
            const code: ServiceUserLoginErrorCode =
                ServiceUserLoginErrorCode.INVALID;

            throw new ServiceError(code).setMessage(getLoginErrorMessage(code));
        }

        // check password

        const isValid: boolean = await verify(user.password, options.password);

        if (!isValid) {
            const code: ServiceUserLoginErrorCode =
                ServiceUserLoginErrorCode.INVALID;

            throw new ServiceError(code).setMessage(getLoginErrorMessage(code));
        }

        // create token

        const payload = {
            id: user._id.toString(),
            name: user.name,
            iat: Date.now(),
        } as const;

        const refresh: string = await sign(
            {
                ...payload,
                exp: Date.now() + 1000 * 60 * 60 * 24 * 365,
            },
            REFRESH_SECRET,
        );

        const access: string = await sign(
            {
                ...payload,
                exp: Date.now() + 1000 * 60 * 15,
            },
            ACCESS_SECRET,
        );

        return {
            id: user._id.toString(),
            name: user.name,
            refresh,
            access,
        };
    } catch (_: unknown) {
        const code: ServiceUserLoginErrorCode =
            ServiceUserLoginErrorCode.UNKNOWN;

        throw new ServiceError(code).setMessage(getLoginErrorMessage(code));
    }
};

export type { ServiceUserLoginOptions, ServiceUserLoginResult, ServiceError };
export {
    ServiceUserLoginErrorCode,
    ServiceUserLoginErrorMessage,
    serviceUserLogin,
};

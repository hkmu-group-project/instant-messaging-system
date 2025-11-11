import type { WithId } from "mongodb";
import type { Format } from "ts-vista";

import type { User } from "#/modules/user/schema";

import { verify } from "@node-rs/argon2";
import { SignJWT } from "jose";

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

const getLoginErrorMessage = (code: ServiceUserLoginErrorCode): string => {
    switch (code) {
        case ServiceUserLoginErrorCode.INVALID:
            return "Invalid username or password";
        case ServiceUserLoginErrorCode.UNKNOWN:
            return "Unknown error";
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
        } as const;

        const alg: string = "HS256";

        const refresh: string = await new SignJWT(payload)
            .setProtectedHeader({
                alg,
            })
            .setIssuedAt()
            .setExpirationTime("1y")
            .sign(new TextEncoder().encode(REFRESH_SECRET));

        const access: string = await new SignJWT(payload)
            .setProtectedHeader({
                alg,
            })
            .setIssuedAt()
            .setExpirationTime("15m")
            .sign(new TextEncoder().encode(ACCESS_SECRET));

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

export type {
    ServiceUserLoginOptions,
    ServiceUserLoginResult,
    ServiceUserLoginErrorCode,
    ServiceError,
};
export { serviceUserLogin };

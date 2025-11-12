import type { WithId } from "mongodb";

import type { User } from "#/modules/user/schema";

import { ObjectId } from "mongodb";

import { findUserByID, updateUser } from "#/modules/user/sql";
import {
    type AccessTokenPayload,
    verifyAccessToken,
} from "#/utils/jwt-verify/access";
import { ServiceError } from "#/utils/service-error";

enum ServiceUserUpdateErrorCode {
    UNAUTHORIZED = "unauthorized",
    FORBIDDEN = "forbidden",
    NOT_FOUND = "not_found",
    UNKNOWN = "unknown",
}

enum ServiceUserUpdateErrorMessage {
    UNAUTHORIZED = "Unauthorized user",
    FORBIDDEN = "Forbidden access",
    NOT_FOUND = "User not found",
    UNKNOWN = "Unknown error",
}

const getErrorMessage = (
    code: ServiceUserUpdateErrorCode,
): ServiceUserUpdateErrorMessage => {
    switch (code) {
        case ServiceUserUpdateErrorCode.UNAUTHORIZED:
            return ServiceUserUpdateErrorMessage.UNAUTHORIZED;
        case ServiceUserUpdateErrorCode.FORBIDDEN:
            return ServiceUserUpdateErrorMessage.FORBIDDEN;
        case ServiceUserUpdateErrorCode.NOT_FOUND:
            return ServiceUserUpdateErrorMessage.NOT_FOUND;
        case ServiceUserUpdateErrorCode.UNKNOWN:
            return ServiceUserUpdateErrorMessage.UNKNOWN;
    }
};

type ServiceUserUpdateOptions = {
    access?: string;
    id: string;
    name?: string;
    password?: string;
};

const serviceUserUpdate = async (
    options: ServiceUserUpdateOptions,
): Promise<void> => {
    try {
        // find user

        const user: WithId<User> | null = await findUserByID(
            new ObjectId(options.id),
        );

        if (!user) {
            const code: ServiceUserUpdateErrorCode =
                ServiceUserUpdateErrorCode.NOT_FOUND;

            throw new ServiceError(code)
                .setStatus(404)
                .setMessage(getErrorMessage(code));
        }

        // check permissions

        const payload: AccessTokenPayload | undefined = await verifyAccessToken(
            options.access,
        );

        if (!payload) {
            const code: ServiceUserUpdateErrorCode =
                ServiceUserUpdateErrorCode.UNAUTHORIZED;

            throw new ServiceError(code)
                .setStatus(404)
                .setMessage(getErrorMessage(code));
        }

        if (payload.id !== user._id.toString()) {
            const code: ServiceUserUpdateErrorCode =
                ServiceUserUpdateErrorCode.FORBIDDEN;

            throw new ServiceError(code)
                .setStatus(404)
                .setMessage(getErrorMessage(code));
        }

        // update user

        await updateUser(user._id, {
            ...(options.name && {
                name: options.name,
            }),
            ...(options.password && {
                password: options.password,
            }),
        });
    } catch (_: unknown) {
        const code: ServiceUserUpdateErrorCode =
            ServiceUserUpdateErrorCode.UNKNOWN;
        throw new ServiceError(code).setMessage(getErrorMessage(code));
    }
};

export {
    ServiceUserUpdateErrorCode,
    ServiceUserUpdateErrorMessage,
    serviceUserUpdate,
};

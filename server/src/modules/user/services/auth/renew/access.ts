import type { AccessTokenPayload } from "#/utils/jwt-verify/access";

import { sign } from "hono/jwt";

import { access_exp } from "#/configs/token";
import { ACCESS_SECRET } from "#/constants";
import { verifyAccessToken } from "#/utils/jwt-verify/access";
import { ServiceError } from "#/utils/service-error";

enum ServiceUserRenewAccessErrorCode {
    INVALID = "invalid",
    UNKNOWN = "unknown",
}

enum ServiceUserRenewAccessErrorMessage {
    INVALID = "Invalid access token",
    UNKNOWN = "Unknown error",
}

const getLoginErrorMessage = (
    code: ServiceUserRenewAccessErrorCode,
): ServiceUserRenewAccessErrorMessage => {
    switch (code) {
        case ServiceUserRenewAccessErrorCode.INVALID:
            return ServiceUserRenewAccessErrorMessage.INVALID;
        case ServiceUserRenewAccessErrorCode.UNKNOWN:
            return ServiceUserRenewAccessErrorMessage.UNKNOWN;
    }
};

type ServiceUserRenewAccessOptions = {
    access?: string;
};

type ServiceUserRenewAccessResult = {
    access: string;
};

const serviceUserRenewAccess = async (
    options: ServiceUserRenewAccessOptions,
): Promise<ServiceUserRenewAccessResult> => {
    try {
        const payload: AccessTokenPayload | undefined = await verifyAccessToken(
            options.access,
        );

        if (!payload) {
            const code: ServiceUserRenewAccessErrorCode =
                ServiceUserRenewAccessErrorCode.INVALID;

            throw new ServiceError(code)
                .setStatus(401)
                .setMessage(getLoginErrorMessage(code));
        }

        const newPayload = {
            id: payload.id,
            name: payload.name,
            iat: Date.now(),
        } as const;

        const access: string = await sign(
            {
                ...newPayload,
                exp: access_exp,
            },
            ACCESS_SECRET,
        );

        return {
            access,
        };
    } catch (_: unknown) {
        const code: ServiceUserRenewAccessErrorCode =
            ServiceUserRenewAccessErrorCode.UNKNOWN;

        throw new ServiceError(code).setMessage(getLoginErrorMessage(code));
    }
};

export type { ServiceUserRenewAccessOptions, ServiceUserRenewAccessResult };
export {
    ServiceUserRenewAccessErrorCode,
    ServiceUserRenewAccessErrorMessage,
    serviceUserRenewAccess,
};

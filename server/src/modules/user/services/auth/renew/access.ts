import type { RefreshTokenPayload } from "#/utils/jwt-verify/refresh";

import { sign } from "hono/jwt";

import { access_exp } from "#/configs/token";
import { ACCESS_SECRET } from "#/constants";
import { verifyRefreshToken } from "#/utils/jwt-verify/refresh";
import { ServiceError } from "#/utils/service-error";

enum ServiceUserRenewAccessErrorCode {
    INVALID = "invalid",
}

enum ServiceUserRenewAccessErrorMessage {
    INVALID = "Invalid access token",
}

const getLoginErrorMessage = (
    code: ServiceUserRenewAccessErrorCode,
): ServiceUserRenewAccessErrorMessage => {
    switch (code) {
        case ServiceUserRenewAccessErrorCode.INVALID:
            return ServiceUserRenewAccessErrorMessage.INVALID;
    }
};

type ServiceUserRenewAccessOptions = {
    refresh?: string;
};

type ServiceUserRenewAccessResult = {
    id: string;
    name: string;
    access: string;
};

const serviceUserRenewAccess = async (
    options: ServiceUserRenewAccessOptions,
): Promise<ServiceUserRenewAccessResult> => {
    const payload: RefreshTokenPayload | undefined = await verifyRefreshToken(
        options.refresh,
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
        id: payload.id,
        name: payload.name,
        access,
    };
};

export type { ServiceUserRenewAccessOptions, ServiceUserRenewAccessResult };
export {
    ServiceUserRenewAccessErrorCode,
    ServiceUserRenewAccessErrorMessage,
    serviceUserRenewAccess,
};

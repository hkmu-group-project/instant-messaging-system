import type { RefreshTokenPayload } from "#/utils/jwt-verify/refresh";

import { sign } from "hono/jwt";

import { refresh_exp } from "#/configs/token";
import { REFRESH_SECRET } from "#/constants";
import { verifyRefreshToken } from "#/utils/jwt-verify/refresh";
import { ServiceError } from "#/utils/service-error";

enum ServiceUserRenewRefreshErrorCode {
    INVALID = "invalid",
}

enum ServiceUserRenewRefreshErrorMessage {
    INVALID = "Invalid refresh token",
}

const getLoginErrorMessage = (
    code: ServiceUserRenewRefreshErrorCode,
): ServiceUserRenewRefreshErrorMessage => {
    switch (code) {
        case ServiceUserRenewRefreshErrorCode.INVALID:
            return ServiceUserRenewRefreshErrorMessage.INVALID;
    }
};

type ServiceUserRenewRefreshOptions = {
    refresh?: string;
};

type ServiceUserRenewRefreshResult = {
    refresh: string;
};

const serviceUserRenewRefresh = async (
    options: ServiceUserRenewRefreshOptions,
): Promise<ServiceUserRenewRefreshResult> => {
    const payload: RefreshTokenPayload | undefined = await verifyRefreshToken(
        options.refresh,
    );

    if (!payload) {
        const code: ServiceUserRenewRefreshErrorCode =
            ServiceUserRenewRefreshErrorCode.INVALID;

        throw new ServiceError(code)
            .setStatus(401)
            .setMessage(getLoginErrorMessage(code));
    }

    const newPayload = {
        id: payload.id,
        name: payload.name,
        iat: Date.now(),
    } as const;

    const refresh: string = await sign(
        {
            ...newPayload,
            exp: refresh_exp,
        },
        REFRESH_SECRET,
    );

    return {
        refresh,
    };
};

export type { ServiceUserRenewRefreshOptions, ServiceUserRenewRefreshResult };
export {
    ServiceUserRenewRefreshErrorCode,
    ServiceUserRenewRefreshErrorMessage,
    serviceUserRenewRefresh,
};

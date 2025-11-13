import { ObjectId } from "mongodb";

import { deleteMessage } from "#/modules/message/sql";
import {
    type AccessTokenPayload,
    verifyAccessToken,
} from "#/utils/jwt-verify/access";
import { ServiceError } from "#/utils/service-error";

enum ServiceMessageDeleteErrorCode {
    INVALID = "invalid",
}

enum ServiceMessageDeleteErrorMessage {
    INVALID = "Invalid access token",
}

const getErrorMessage = (
    code: ServiceMessageDeleteErrorCode,
): ServiceMessageDeleteErrorMessage => {
    switch (code) {
        case ServiceMessageDeleteErrorCode.INVALID:
            return ServiceMessageDeleteErrorMessage.INVALID;
    }
};

type ServiceMessageDeleteOptions = {
    access?: string;
    id: string;
};

const serviceMessageDelete = async (
    options: ServiceMessageDeleteOptions,
): Promise<void> => {
    const payload: AccessTokenPayload | undefined = await verifyAccessToken(
        options.access,
    );

    if (!payload) {
        const code: ServiceMessageDeleteErrorCode =
            ServiceMessageDeleteErrorCode.INVALID;

        throw new ServiceError(code)
            .setStatus(401)
            .setMessage(getErrorMessage(code));
    }

    await deleteMessage(new ObjectId(options.id));
};

export type { ServiceMessageDeleteOptions };
export {
    ServiceMessageDeleteErrorCode,
    ServiceMessageDeleteErrorMessage,
    serviceMessageDelete,
};

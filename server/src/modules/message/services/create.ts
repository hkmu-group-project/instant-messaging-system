import type { Message } from "#/modules/message/schema";
import type { AccessTokenPayload } from "#/utils/jwt-verify/access";

import { type InsertOneResult, ObjectId } from "mongodb";

import { createMessage } from "#/modules/message/sql";
import { verifyAccessToken } from "#/utils/jwt-verify/access";
import { ServiceError } from "#/utils/service-error";

enum ServiceMessageCreateErrorCode {
    INVALID = "invalid",
}

enum ServiceMessageCreateErrorMessage {
    INVALID = "Invalid access token",
}

const getErrorMessage = (
    code: ServiceMessageCreateErrorCode,
): ServiceMessageCreateErrorMessage => {
    switch (code) {
        case ServiceMessageCreateErrorCode.INVALID:
            return ServiceMessageCreateErrorMessage.INVALID;
    }
};

type ServiceMessageCreateOptions = {
    access?: string;
    roomId: string;
    content: string;
};

const serviceMessageCreate = async (
    options: ServiceMessageCreateOptions,
): Promise<InsertOneResult<Message>> => {
    const payload: AccessTokenPayload | undefined = await verifyAccessToken(
        options.access,
    );

    if (!payload) {
        const code: ServiceMessageCreateErrorCode =
            ServiceMessageCreateErrorCode.INVALID;

        throw new ServiceError(code)
            .setStatus(401)
            .setMessage(getErrorMessage(code));
    }

    return await createMessage({
        roomId: new ObjectId(options.roomId),
        sender: new ObjectId(payload.id),
        content: options.content,
    });
};

export type { ServiceMessageCreateOptions };
export {
    ServiceMessageCreateErrorCode,
    ServiceMessageCreateErrorMessage,
    serviceMessageCreate,
};

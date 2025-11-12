import type { AccessTokenPayload } from "#/utils/jwt-verify/access";

import { ObjectId } from "mongodb";

import { deleteRoom } from "#/modules/room/sql";
import { verifyAccessToken } from "#/utils/jwt-verify/access";
import { ServiceError } from "#/utils/service-error";

enum ServiceRoomDeleteErrorCode {
    INVALID = "invalid",
}

enum ServiceRoomDeleteErrorMessage {
    INVALID = "Invalid access token",
}

const getErrorMessage = (
    code: ServiceRoomDeleteErrorCode,
): ServiceRoomDeleteErrorMessage => {
    switch (code) {
        case ServiceRoomDeleteErrorCode.INVALID:
            return ServiceRoomDeleteErrorMessage.INVALID;
    }
};

type ServiceRoomDeleteOptions = {
    access?: string;
    id: string;
};

const serviceRoomDelete = async (
    options: ServiceRoomDeleteOptions,
): Promise<void> => {
    const payload: AccessTokenPayload | undefined = await verifyAccessToken(
        options.access,
    );

    if (!payload) {
        const code: ServiceRoomDeleteErrorCode =
            ServiceRoomDeleteErrorCode.INVALID;

        throw new ServiceError(code)
            .setStatus(401)
            .setMessage(getErrorMessage(code));
    }

    await deleteRoom(new ObjectId(options.id));
};

export type { ServiceRoomDeleteOptions };
export {
    ServiceRoomDeleteErrorCode,
    ServiceRoomDeleteErrorMessage,
    serviceRoomDelete,
};

import { ObjectId } from "mongodb";

import {
    type AccessTokenPayload,
    verifyAccessToken,
} from "#/utils/jwt-verify/access";
import { ServiceError } from "#/utils/service-error";
import { createRoom } from "../sql";

enum ServiceRoomCreateErrorCode {
    INVALID = "invalid",
}

enum ServiceRoomCreateErrorMessage {
    INVALID = "Invalid access token",
}

const getErrorMessage = (
    code: ServiceRoomCreateErrorCode,
): ServiceRoomCreateErrorMessage => {
    switch (code) {
        case ServiceRoomCreateErrorCode.INVALID:
            return ServiceRoomCreateErrorMessage.INVALID;
    }
};

type ServiceRoomCreateOptions = {
    access?: string;
    name: string;
    description?: string;
};

const serviceRoomCreate = async (
    options: ServiceRoomCreateOptions,
): Promise<void> => {
    const payload: AccessTokenPayload | undefined = await verifyAccessToken(
        options.access,
    );

    if (!payload) {
        const code: ServiceRoomCreateErrorCode =
            ServiceRoomCreateErrorCode.INVALID;

        throw new ServiceError(code)
            .setStatus(401)
            .setMessage(getErrorMessage(code));
    }

    await createRoom({
        ownerId: new ObjectId(payload.id),
        name: options.name,
        description: options.description,
    });
};

export type { ServiceRoomCreateOptions };
export {
    ServiceRoomCreateErrorCode,
    ServiceRoomCreateErrorMessage,
    serviceRoomCreate,
};

import type { AccessTokenPayload } from "#/utils/jwt-verify/access";
import type { Room } from "../schema";

import { ObjectId, type UpdateResult } from "mongodb";

import { updateRoom } from "#/modules/room/sql";
import { verifyAccessToken } from "#/utils/jwt-verify/access";
import { ServiceError } from "#/utils/service-error";

enum ServiceRoomUpdateErrorCode {
    INVALID = "invalid",
}

enum ServiceRoomUpdateErrorMessage {
    INVALID = "Invalid access token",
}

const getErrorMessage = (
    code: ServiceRoomUpdateErrorCode,
): ServiceRoomUpdateErrorMessage => {
    switch (code) {
        case ServiceRoomUpdateErrorCode.INVALID:
            return ServiceRoomUpdateErrorMessage.INVALID;
    }
};

type ServiceRoomUpdateOptions = {
    access?: string;
    id: string;
    name?: string;
    description?: string;
};

const serviceRoomUpdate = async (
    options: ServiceRoomUpdateOptions,
): Promise<UpdateResult<Room>> => {
    const payload: AccessTokenPayload | undefined = await verifyAccessToken(
        options.access,
    );

    if (!payload) {
        const code: ServiceRoomUpdateErrorCode =
            ServiceRoomUpdateErrorCode.INVALID;

        throw new ServiceError(code)
            .setStatus(401)
            .setMessage(getErrorMessage(code));
    }

    return await updateRoom(new ObjectId(options.id), {
        name: options.name,
        description: options.description,
    });
};

export type { ServiceRoomUpdateOptions };
export {
    ServiceRoomUpdateErrorCode,
    ServiceRoomUpdateErrorMessage,
    serviceRoomUpdate,
};

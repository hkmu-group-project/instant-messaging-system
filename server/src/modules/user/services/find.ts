import type { WithId } from "mongodb";

import type { WithStringId } from "#/@types/schema";
import type { ProtectedUser, User } from "#/modules/user/schema";

import { ObjectId } from "mongodb";

import { findUserByID, findUserByName } from "#/modules/user/sql";
import { ServiceError } from "#/utils/service-error";

type ServiceUserFindOptions = {
    id?: string;
    name?: string;
};

enum ServiceUserFindErrorCode {
    MISSING = "missing",
    NOT_FOUND = "not_found",
    UNKNOWN = "unknown",
}

const getErrorMessage = (code: ServiceUserFindErrorCode): string => {
    switch (code) {
        case ServiceUserFindErrorCode.MISSING:
            return "Missing id or name";
        case ServiceUserFindErrorCode.NOT_FOUND:
            return "User not found";
        case ServiceUserFindErrorCode.UNKNOWN:
            return "Unknown error";
    }
};

const serviceUserFind = async (
    options: ServiceUserFindOptions,
): Promise<WithStringId<ProtectedUser>> => {
    try {
        // find user

        let user: WithId<User> | null = null;

        if (options.id) {
            user = await findUserByID(new ObjectId(options.id));
        } else if (options.name) {
            user = await findUserByName(options.name);
        } else {
            const code: ServiceUserFindErrorCode =
                ServiceUserFindErrorCode.MISSING;

            throw new ServiceError(code).setMessage(getErrorMessage(code));
        }

        if (!user) {
            const code: ServiceUserFindErrorCode =
                ServiceUserFindErrorCode.NOT_FOUND;

            throw new ServiceError(code).setMessage(getErrorMessage(code));
        }

        return {
            id: user._id.toString(),
            name: user.name,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    } catch (_: unknown) {
        const code: ServiceUserFindErrorCode = ServiceUserFindErrorCode.UNKNOWN;

        throw new ServiceError(code).setMessage(getErrorMessage(code));
    }
};

export { serviceUserFind };

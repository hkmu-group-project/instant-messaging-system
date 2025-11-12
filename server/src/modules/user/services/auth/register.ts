import type { WithId } from "mongodb";
import type { Format } from "ts-vista";

import type { User } from "#/modules/user/schema";

import { hash } from "@node-rs/argon2";

import { createUser, findUserByName } from "#/modules/user/sql";
import { ServiceError } from "#/utils/service-error";

type ServiceUserRegisterOptions = Format<Pick<User, "name" | "password">>;

enum ServiceUserRegisterErrorCode {
    DUPLICATE = "duplicate",
    UNKNOWN = "unknown",
}

enum ServiceUserRegisterErrorMessage {
    DUPLICATE = "User already exists",
    UNKNOWN = "Unknown error",
}

const getRegisterErrorMessage = (
    code: ServiceUserRegisterErrorCode,
): ServiceUserRegisterErrorMessage => {
    switch (code) {
        case ServiceUserRegisterErrorCode.DUPLICATE:
            return ServiceUserRegisterErrorMessage.DUPLICATE;
        case ServiceUserRegisterErrorCode.UNKNOWN:
            return ServiceUserRegisterErrorMessage.UNKNOWN;
    }
};

const serviceUserRegister = async (
    options: ServiceUserRegisterOptions,
): Promise<void> => {
    try {
        // check duplicate

        const duplicate: WithId<User> | null = await findUserByName(
            options.name,
        );

        if (duplicate) {
            const code: ServiceUserRegisterErrorCode =
                ServiceUserRegisterErrorCode.DUPLICATE;

            throw new ServiceError(code)
                .setStatus(409)
                .setMessage(getRegisterErrorMessage(code));
        }

        // hash user password

        const hashed: string = await hash(options.password);

        // create user

        await createUser({
            name: options.name,
            password: hashed,
        });
    } catch (_: unknown) {
        const code: ServiceUserRegisterErrorCode =
            ServiceUserRegisterErrorCode.UNKNOWN;
        throw new ServiceError(code).setMessage(getRegisterErrorMessage(code));
    }
};

export type { ServiceUserRegisterOptions, ServiceError };
export {
    ServiceUserRegisterErrorCode,
    ServiceUserRegisterErrorMessage,
    serviceUserRegister,
};

import type { Collection } from "mongodb";
import type { Format, Omit } from "ts-vista";

import { getDatabase } from "#/configs/database";

const COLLECTION_NAME: string = "user" as const;

type User = {
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
};

type ProtectedUser = Format<Omit<User, "password">>;

const user: Collection<User> = getDatabase().collection<User>(COLLECTION_NAME);

export type { User, ProtectedUser };
export { user };

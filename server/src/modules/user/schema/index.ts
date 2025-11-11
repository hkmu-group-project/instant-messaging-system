import type { Collection } from "mongodb";
import type { Format, Omit } from "ts-vista";

import { db } from "#/configs/database";

const COLLECTION_NAME: string = "user" as const;

type User = {
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
};

type ProtectedUser = Format<Omit<User, "password">>;

const user: Collection<User> = db.collection<User>(COLLECTION_NAME);

export type { User, ProtectedUser };
export { user };

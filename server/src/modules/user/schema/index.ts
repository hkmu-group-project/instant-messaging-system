import type { Collection } from "mongodb";

import { getDatabase } from "#/configs/database";

const COLLECTION_NAME: string = "user" as const;

type User = {
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
};

const user: Collection<User> = getDatabase().collection<User>(COLLECTION_NAME);

export type { User };
export { user };

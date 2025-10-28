import type { Collection } from "mongodb";

import { getDatabase } from "#/configs/database";

const COLLECTION_NAME: string = "room" as const;

type Room = {
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
};

const room: Collection<Room> = getDatabase().collection<Room>(COLLECTION_NAME);

export type { Room };
export { room };

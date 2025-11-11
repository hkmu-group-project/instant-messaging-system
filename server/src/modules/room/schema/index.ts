import type { Collection } from "mongodb";

import { db } from "#/configs/database";

const COLLECTION_NAME: string = "room" as const;

type Room = {
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
};

const room: Collection<Room> = db.collection<Room>(COLLECTION_NAME);

export type { Room };
export { room };

import type { Collection } from "mongodb";

import { getDatabase } from "#/configs/database";

const COLLECTION_NAME: string = "message" as const;

type Message = {
    sender: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
};

const message: Collection<Message> =
    getDatabase().collection<Message>(COLLECTION_NAME);

export type { Message };
export { message };

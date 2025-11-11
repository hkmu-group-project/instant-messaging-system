import type { Collection, ObjectId } from "mongodb";

import { db } from "#/configs/database";

const COLLECTION_NAME: string = "message" as const;

type Message = {
    roomId: ObjectId;
    sender: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
};

const message: Collection<Message> = db.collection<Message>(COLLECTION_NAME);

export type { Message };
export { message };

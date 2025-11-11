import type { Db } from "mongodb";

import { MongoClient } from "mongodb";

import { MONGODB_DB_NAME, MONGODB_URI } from "#/constants";

let database: Db;

const connectDatabase = async (): Promise<void> => {
    try {
        const client: MongoClient = await MongoClient.connect(MONGODB_URI);
        database = client.db(MONGODB_DB_NAME);
    } catch (_: unknown) {
        throw new Error("Failed to connect to database.");
    }
};

const getDatabase = async (): Promise<Db> => {
    if (!database) await connectDatabase();
    return database;
};

const db: Db = await getDatabase();

export { db };

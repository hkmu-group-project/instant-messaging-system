import { type Db, MongoClient } from "mongodb";

let client: MongoClient;
let database: Db;

const connectDatabase = async (): Promise<void> => {
    try {
        client = await MongoClient.connect(import.meta.env.MONGODB_URI);
        database = client.db(import.meta.env.MONGODB_DB_NAME);
    } catch (_: unknown) {
        throw new Error("Failed to connect to database.");
    }
};

const getDatabase = (): Db => {
    if (!database) throw new Error("Database is not connected.");
    return database;
};

export { connectDatabase, getDatabase };

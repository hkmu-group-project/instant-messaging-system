import { getDatabase } from "#/configs/database";

type User = {
    name: string;
    password: string;
};

const user = getDatabase().collection<User>("user");

export type { User };
export { user };

import type { InsertOneResult, ObjectId, UpdateResult, WithId } from "mongodb";
import type { Format, Partial } from "ts-vista";

import type { User } from "#/modules/user/schema";

import { user } from "#/modules/user/schema";

const findUserByID = async (id: ObjectId): Promise<WithId<User> | null> => {
    return await user.findOne({
        _id: id,
    });
};

const findUserByName = async (name: string): Promise<WithId<User> | null> => {
    return await user.findOne({
        name,
    });
};

type CreateUserData = Format<Pick<User, "name" | "password">>;

const createUser = async (
    data: CreateUserData,
): Promise<InsertOneResult<User>> => {
    return await user.insertOne({
        name: data.name,
        password: data.password,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
};

type UpdateUserData = Format<Partial<CreateUserData>>;

const updateUser = async (
    id: ObjectId,
    data: UpdateUserData,
): Promise<UpdateResult<User>> => {
    return await user.updateOne(
        {
            _id: id,
        },
        {
            $set: {
                ...data,
                updatedAt: new Date(),
            },
        },
    );
};

export type { CreateUserData, UpdateUserData };
export { findUserByID, findUserByName, createUser, updateUser };

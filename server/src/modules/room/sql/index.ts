import type {
    DeleteResult,
    InsertOneResult,
    ObjectId,
    UpdateResult,
    WithId,
} from "mongodb";
import type { Format, Partial } from "ts-vista";

import type { Room } from "#/modules/room/schema";

import { room } from "#/modules/room/schema";

type FindRoomsOptions =
    | {
          after?: ObjectId;
          first?: number;
          before?: never;
          last?: never;
      }
    | {
          after?: never;
          first?: never;
          before?: ObjectId;
          last?: number;
      };

const findRooms = async (
    options?: FindRoomsOptions,
): Promise<WithId<Room>[]> => {
    if (!options) return await room.find().toArray();

    // limit to 100 results at a time
    const limit: number = Math.min(
        100,
        options.first ? options.first : options.last ? options.last : 100,
    );

    return await room
        .find({
            ...(options.after && {
                _id: {
                    $gt: options.after,
                },
            }),
            ...(options.before && {
                _id: {
                    $lt: options.before,
                },
            }),
        })
        .sort({
            _id: options.last ? -1 : 1,
        })
        .limit(limit)
        .toArray();
};

const findRoomByID = async (_id: ObjectId): Promise<WithId<Room> | null> => {
    return await room.findOne({
        _id,
    });
};

type CreateRoomData = Format<Pick<Room, "ownerId" | "name" | "description">>;

const createRoom = async (
    data: CreateRoomData,
): Promise<InsertOneResult<Room>> => {
    return await room.insertOne({
        ownerId: data.ownerId,
        name: data.name,
        description: data.description,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
};

type UpdateRoomData = Format<Partial<CreateRoomData>>;

const updateRoom = async (
    id: ObjectId,
    data: UpdateRoomData,
): Promise<UpdateResult<Room>> => {
    return await room.updateOne(
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

const deleteRoom = async (id: ObjectId): Promise<DeleteResult> => {
    return await room.deleteOne({
        _id: id,
    });
};

export type { FindRoomsOptions, CreateRoomData, UpdateRoomData };
export { findRooms, findRoomByID, createRoom, updateRoom, deleteRoom };

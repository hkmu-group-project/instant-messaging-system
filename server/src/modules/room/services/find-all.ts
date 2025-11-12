import type { WithId } from "mongodb";

import type { Room } from "#/modules/room/schema";
import type { FindRoomsOptions } from "#/modules/room/sql";

import { findRooms } from "#/modules/room/sql";

type ServiceRoomFindAllOptions = FindRoomsOptions;

const serviceRoomFindAll = async (
    options: ServiceRoomFindAllOptions,
): Promise<WithId<Room>[]> => {
    return await findRooms(options);
};

export { serviceRoomFindAll };

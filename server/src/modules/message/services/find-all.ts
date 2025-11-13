import type { WithId } from "mongodb";

import type { Message } from "#/modules/message/schema";
import type { FindMessagesOptions } from "#/modules/message/sql";

import { findMessages } from "#/modules/message/sql";

type ServiceRoomFindAllOptions = FindMessagesOptions;

const serviceMessageFindAll = async (
    options: ServiceRoomFindAllOptions,
): Promise<WithId<Message>[]> => {
    return await findMessages(options);
};

export { serviceMessageFindAll };

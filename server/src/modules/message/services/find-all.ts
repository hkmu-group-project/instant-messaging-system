import type { WithId } from "mongodb";

import type { WithStringId } from "#/@types/schema";
import type { Message } from "#/modules/message/schema";
import type { FindMessagesOptions } from "#/modules/message/sql";

import { findMessages } from "#/modules/message/sql";

type ServiceRoomFindAllOptions = FindMessagesOptions;

const serviceMessageFindAll = async (
    options: ServiceRoomFindAllOptions,
): Promise<WithStringId<Message>[]> => {
    const messages: WithId<Message>[] = await findMessages(options);

    const result: WithStringId<Message>[] = messages.map(
        (message: WithId<Message>): WithStringId<Message> => ({
            ...message,
            id: message._id.toString(),
        }),
    );

    return result;
};

export { serviceMessageFindAll };

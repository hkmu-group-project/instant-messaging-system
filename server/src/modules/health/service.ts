import z from "zod";

import { getUptime } from "#/constants";

const healthInfoSchema = z.object({
    uptime: z.number(),
});

type HealthInfo = z.infer<typeof healthInfoSchema>;

const serviceHealth = async (): Promise<HealthInfo> => {
    return {
        uptime: getUptime().seconds,
    };
};

export type { HealthInfo };
export { healthInfoSchema, serviceHealth };

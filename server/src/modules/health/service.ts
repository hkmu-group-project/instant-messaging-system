import { getUptime } from "#/constants";

type HealthInfo = {
    uptime: number;
};

const serviceHealth = async (): Promise<HealthInfo> => {
    return {
        uptime: getUptime().seconds,
    };
};

export type { HealthInfo };
export { serviceHealth };

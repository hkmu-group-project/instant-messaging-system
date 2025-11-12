import { verify } from "hono/jwt";

import { ACCESS_SECRET } from "#/constants";

type AccessTokenPayload = {
    id: string;
    name: string;
    iat: number;
    exp: number;
};

const verifyAccessToken = async (access: string | undefined) => {
    try {
        if (!access) return void 0;

        const result: AccessTokenPayload = (await verify(
            access,
            ACCESS_SECRET,
        )) as AccessTokenPayload;

        return result;
    } catch (_: unknown) {
        return void 0;
    }
};

export type { AccessTokenPayload };
export { verifyAccessToken };

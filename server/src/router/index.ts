import type { Context } from "hono";

import { Hono } from "hono";

import { expressHandler } from "#/router/express";

const router: Hono = new Hono();

router.use("/*", async (c: Context): Promise<Response> => {
    return await expressHandler(c.req.raw);
});

export { router };

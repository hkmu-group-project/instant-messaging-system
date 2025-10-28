import type { Express, NextFunction, Request, Response } from "express";

import express from "express";

import { connectDatabase } from "#/configs/database";
import { PATH_PUBLIC, PORT, START_TIME } from "#/constants";
import { router } from "#/router";

const app: Express = express();

app.use(
    async (
        _req: Request,
        _res: Response,
        next: NextFunction,
    ): Promise<void> => {
        await connectDatabase();
        next();
    },
);

app.use(express.json());

app.use("/", router);

app.use("/static", express.static(PATH_PUBLIC));

// production
if (import.meta.env.PROD) {
    app.listen(PORT, (): void => {
        console.log(`Server started at ${new Date(START_TIME)}`);
        console.log(`Server running on port ${PORT}`);
    });
}

// development
export { app };

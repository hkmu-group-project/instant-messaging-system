import * as Path from "node:path";

const IS_DEV: boolean = import.meta.env.DEV;

const IS_PRD: boolean = import.meta.env.PROD;

/**
 * The path to the public directory.
 */
const PATH_PUBLIC: string = IS_PRD
    ? Path.join(__dirname)
    : Path.join(process.cwd(), "public");

/**
 * The port to run the server on.
 *
 * By default, it is `3000`.
 */
const PORT: number = Number(import.meta.env.VITE_PORT) || 3000;

/**
 * The MongoDB connection URI.
 */
const MONGODB_URI: string = import.meta.env.VITE_MONGODB_URI;

/**
 * The MongoDB database name.
 */
const MONGODB_DB_NAME: string = import.meta.env.VITE_MONGODB_DB_NAME;

/**
 * The refresh token secret.
 */
const REFRESH_SECRET: string = import.meta.env.VITE_REFRESH_SECRET;

/**
 * The access token secret.
 */
const ACCESS_SECRET: string = import.meta.env.VITE_ACCESS_SECRET;

/**
 * The time the server started at.
 */
const START_TIME: number = Date.now();

/**
 * Uptime information.
 */
type Uptime = {
    milliseconds: number;
    seconds: number;
    minutes: number;
    hours: number;
};

/**
 * Get the uptime of the server.
 */
const getUptime = (): Uptime => {
    const now: number = Date.now();
    const diff: number = now - START_TIME;

    const milliseconds: number = diff;
    const seconds: number = Math.floor(diff / 1000);
    const minutes: number = Math.floor(seconds / 60);
    const hours: number = Math.floor(minutes / 60);

    return {
        milliseconds,
        seconds,
        minutes,
        hours,
    };
};

export {
    IS_DEV,
    IS_PRD,
    PATH_PUBLIC,
    PORT,
    MONGODB_URI,
    MONGODB_DB_NAME,
    REFRESH_SECRET,
    ACCESS_SECRET,
    START_TIME,
    getUptime,
};

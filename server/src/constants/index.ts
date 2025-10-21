import * as Path from "node:path";

/**
 * The path to the public directory.
 */
const PATH_PUBLIC: string = import.meta.env.PROD
    ? Path.join(__dirname)
    : Path.join(process.cwd(), "public");

/**
 * The port to run the server on.
 *
 * By default, it is `3000`.
 */
const PORT: number = Number(import.meta.env.VITE_PORT) || 3000;

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

export { PATH_PUBLIC, PORT, START_TIME, getUptime };

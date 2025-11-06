import Path from "node:path";
import Url from "node:url";

import build from "@hono/vite-build/node";
import devServer from "@hono/vite-dev-server";
import nodeAdapter from "@hono/vite-dev-server/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const __filename: string = Url.fileURLToPath(import.meta.url);
const __dirname: string = Path.dirname(__filename);

export default defineConfig({
    define: {
        __filename: JSON.stringify(__filename),
        __dirname: JSON.stringify(__dirname),
    },
    plugins: [
        tsconfigPaths(),
        devServer({
            entry: "./src/index.ts",
            adapter: nodeAdapter,
        }),
        build({
            port: 4000,
            entry: "./src/index.ts",
            minify: true,
            emptyOutDir: true,
        }),
    ],
    server: {
        // development server port
        port: 4001,
    },
});

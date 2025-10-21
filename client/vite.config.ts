import { unstable_reactRouterRSC as reactRouter } from "@react-router/dev/vite";
import rsc from "@vitejs/plugin-rsc";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [
        tsconfigPaths(),
        reactRouter(),
        rsc(),
        devtoolsJson(),
    ],
    server: {
        port: 3001,
    },
    preview: {
        port: 3000,
    },
});

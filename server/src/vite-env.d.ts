/** biome-ignore-all lint/correctness/noUnusedVariables: Vite */

/// <reference types="vite/client" />

interface ViteTypeOptions {
    strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
    readonly VITE_PORT: string;
    readonly VITE_MONGODB_URI: string;
    readonly VITE_MONGODB_DB_NAME: string;
    readonly VITE_REFRESH_SECRET: string;
    readonly VITE_ACCESS_SECRET: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

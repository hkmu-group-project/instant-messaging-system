/** biome-ignore-all lint/correctness/noUnusedVariables: Vite */

/// <reference types="vite/client" />

interface ViteTypeOptions {
    strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
    readonly MONGODB_URI: string;
    readonly MONGODB_DB_NAME: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

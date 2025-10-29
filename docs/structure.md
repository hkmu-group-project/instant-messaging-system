[< Back](../README.md)

# Project Structure

The project structure is as follows:

```
.
├── client/: client source code
│   ├── public/: static files
│   ├── src/: source code
│   ├── .gitignore: git ignore
│   ├── package.json: dependencies for the project
│   ├── react-router.config.ts: React Router configuration
│   ├── tsconfig.json: TypeScript configuration
│   └── vite.config.ts: Vite configuration
│
├── docs/: documentations
│   ├── structure.md: structure of the project
│   └── workflow.md: workflow of the project
│
├── server/: server source code
│   ├── public/: static files
│   ├── src/: source code
│   ├── .env: environment variables
│   ├── .env.example: example environment variables
│   ├── package.json: dependencies for the project
│   ├── tsconfig.json: TypeScript configuration
│   └── vite.config.ts: Vite configuration
│
├── .gitattributes: git attributes
├── .gitignore: git ignore
├── .node-version: Node.js version
├── .npmrc: npm configuration
├── biome.json: linter/formatter configuration
├── justfile: commands for the project
├── package.json: dependencies for the monorepo
├── pnpm-lock.yaml: lock file for pnpm
├── pnpm-workspace.yaml: workspace configuration for pnpm
└── tsconfig.base.json: base configuration for TypeScript
```

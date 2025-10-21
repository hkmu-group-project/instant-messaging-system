set shell := ["bash", "-cu"]
set windows-shell := ["powershell"]

node_bin := "./node_modules/.bin/"
tsc := node_bin + "tsc"
biome := node_bin + "biome"
react_router := node_bin + "react-router"
react_serve := node_bin + "react-router-serve"
vite := node_bin + "vite"

cli := "client"
srv := "server"

# Default action
_:
    just lint
    just fmt

# Install
i:
    pnpm install

# Lint with TypeScript Compiler
tsc:
    cd ./{{cli}} && ./{{react_router}} typegen && ../{{tsc}} --noEmit
    cd ./{{srv}} && ../{{tsc}} --noEmit

# Lint code
lint:
    just tsc

# Format code
fmt:
    ./{{biome}} check --write .

# Start client in development
dev-cli:
    cd ./{{cli}} && ./{{react_router}} dev

# Build client
build-cli:
    cd ./{{cli}} && ./{{react_router}} build

# Start client in production (Require build first)
start-cli:
    cd ./{{cli}} && ./{{react_serve}} ./dist/server/index.js

# Start server in development
dev-srv:
    cd ./{{srv}} && ./{{vite}}

# Build server
build-srv:
    cd ./{{srv}} && ../{{tsc}} --noEmit && ./{{vite}} build

# Start server in production (Require build first)
start-srv:
    cd ./{{srv}} && node ./dist/index.js

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

# Lint client with TypeScript Compiler
tsc-cli:
    cd ./{{cli}} && ./{{react_router}} typegen && ../{{tsc}} --noEmit

# Lint server with TypeScript Compiler
tsc-srv:
    cd ./{{srv}} && ../{{tsc}} --noEmit

# Lint with TypeScript Compiler
tsc:
    just tsc-cli
    just tsc-srv

# Lint code
lint:
    just tsc

# Format client code
fmt-cli:
    ./{{biome}} check --write ./{{cli}}

# Format server code
fmt-srv:
    ./{{biome}} check --write ./{{srv}}

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

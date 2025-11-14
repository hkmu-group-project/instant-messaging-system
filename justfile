set shell := ["bash", "-cu"]
set windows-shell := ["powershell"]

node_bin := "./node_modules/.bin/"
tsc := node_bin + "tsc"
biome := node_bin + "biome"
openapi := node_bin + "openapi-ts"
next := node_bin + "next"
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

# Typegen
typegen:
    cd ./{{cli}} && ./{{next}} typegen

# OpenAPI gen
gen:
    cd ./{{cli}} && ./{{openapi}} \
    -i http://localhost:4001/openapi.json \
    -o ./.openapi

# OpenAPI gen
gen-prd:
    cd ./{{cli}} && ./{{openapi}} \
    -i https://example.com/openapi.json \
    -o ./.openapi

# Lint client with TypeScript Compiler
tsc-cli:
    just typegen
    cd ./{{cli}} && ../{{tsc}} --noEmit

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
    cd ./{{cli}} && ./{{next}} dev -p 3001

# Build client
build-cli:
    cd ./{{cli}} && ./{{next}} build

# Start client in production (Require build first)
start-cli:
    cd ./{{cli}} && ./{{next}} start -p 3000

# Start server in development
dev-srv:
    cd ./{{srv}} && ./{{vite}}

# Build server
build-srv:
    cd ./{{srv}} && ../{{tsc}} --noEmit && ./{{vite}} build

# Start server in production (Require build first)
start-srv:
    cd ./{{srv}} && node ./dist/index.js

[< Back](./README.md)

# Contributing

This is the contribution document for the Instant Messaging System.

## Before the Contribution

Please install the following dependencies:

> Consider using [mise](https://mise.jdx.dev/) for dependencies version control of Node.js and pnpm.

| Dependencies                             | Description        |
| ---------------------------------------- | ------------------ |
| [Node.js v24 LTS](https://nodejs.org/en) | JavaScript runtime |
| [pnpm v10.18](https://pnpm.io/)          | Better npm         |
| [just](https://just.systems/)            | Command runner     |

## How to Run

Install dependencies:

```sh
just i
```

For checking with TypeScript Compiler:

```sh
just tsc

# for client only

just tsc-cli

# for server only

just tsc-srv
```

For checking and formatting code:

```sh
just fmt

# for client only

just fmt-cli

# for server only

just fmt-srv
```

Run the client in development mode:

```sh
just dev-cli
```

Run the server in development mode:

```sh
just dev-srv
```

Start the client in production mode:

```sh
just build-cli
just start-cli
```

Start the server in production mode:

```sh
just build-srv
just start-srv
```

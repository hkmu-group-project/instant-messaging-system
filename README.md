# Instant Messaging System

A instant messaging system for users to communicate with each other.

## Workflow

For the workflow, please refer to [workflow.md](./docs/workflow.md).

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

For linting, format and test:

```sh
just
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

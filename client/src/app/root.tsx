import type * as React from "react";

import type { Route } from "#/app/+types/root";

import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    ScrollRestoration,
} from "react-router";

export const links: Route.LinksFunction = (): Route.LinkDescriptors => [];

export const meta: Route.MetaFunction = ({
    error: _error,
}: Route.MetaArgs): Route.MetaDescriptors => {
    return [
        {
            title: "Instant Messaging System",
        },
        {
            name: "description",
            content: "Welcome to Instant Messaging System!",
        },
    ];
};

export const Layout = ({
    children,
}: {
    children: React.ReactNode;
}): React.JSX.Element => {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
            </body>
        </html>
    );
};

export const ErrorBoundary = ({
    error,
}: Route.ErrorBoundaryProps): React.JSX.Element => {
    let message: string = "Oops!";
    let details: string = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main>
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre>
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
};

export default (): React.JSX.Element => {
    return <Outlet />;
};

import type { Metadata, ResolvingMetadata, Viewport } from "next";
import type * as React from "react";

export const generateMetadata = async (
    _props: Record<string, unknown>,
    _: ResolvingMetadata,
): Promise<Metadata> => {
    const title: string = "Instant Messaging System";
    const description: string = "Connect with people from all over the world!";

    return {
        title,
        description,
    };
};

export const viewport: Viewport = {
    minimumScale: 1,
    maximumScale: 1,
    initialScale: 1,
    viewportFit: "cover",
    userScalable: false,
};

export default ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): React.JSX.Element => {
    // content
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
            </head>
            <body>
                <main>{children}</main>
            </body>
        </html>
    );
};

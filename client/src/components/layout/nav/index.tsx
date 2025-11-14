import type * as React from "react";

const Nav = (): React.JSX.Element => {
    return (
        <nav>
            <a href="/">Home</a>
            <a href="/settings">Settings</a>
        </nav>
    );
};

export { Nav };

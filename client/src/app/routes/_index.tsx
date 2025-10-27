import type * as React from "react";

import { useState } from "react";

export default () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            alert("Please enter username or password.");
            return;
        }

        try {
            console.log("Sending username to backend:", username);

            alert(`Welcome ${username}! Entering chatroom...`);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div
                style={{
                    backgroundColor: "#2c3e50",
                    color: "white",
                    padding: "1rem 2rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
            >
                <h1
                    style={{
                        margin: 0,
                        fontSize: "1.5rem",
                    }}
                >
                    💬 Chat System
                </h1>
                <div
                    style={{
                        fontSize: "0.9rem",
                        opacity: 0.8,
                    }}
                >
                    Secure Messaging Platform
                </div>
            </div>
            <h1>Welcome to Chat Box</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Please input your username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Please input your password"
                />
                <button type="submit">Enter Chatroom</button>
            </form>
        </div>
    );
};

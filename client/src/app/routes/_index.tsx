import type * as React from "react";
import { useState } from "react";

// Types from SettingsPage
type Theme = "light" | "dark" | "system";
type Language = "en" | "zh-Hant" | "system";
type FontSize = "small" | "medium" | "large";

export default () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showSettings, setShowSettings] = useState(false);
    
    // Settings state
    const [theme, setTheme] = useState<Theme>("system");
    const [language, setLanguage] = useState<Language>("system");
    const [fontSize, setFontSize] = useState<FontSize>("medium");
    
    // Derive actual theme from system preference
    const effectiveTheme = theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        : theme;

    // Colors based on theme
    const colors = {
        background: effectiveTheme === "dark" ? "#1a1a1a" : "#f9f9fb",
        cardBg: effectiveTheme === "dark" ? "#2d2d2d" : "#ffffff",
        text: effectiveTheme === "dark" ? "#e0e0e0" : "#1a1a1a",
        mutedText: effectiveTheme === "dark" ? "#aaaaaa" : "#666666",
        border: effectiveTheme === "dark" ? "#444444" : "#e0e0e0",
        primary: "#6750A4",
    };

    // Font size mapping
    const fontSizeMap = { small: 0, medium: 1, large: 2 };
    const fontScale = fontSize === "small" ? 0.9 : fontSize === "medium" ? 1 : 1.15;

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

    // Translations (simple mock i18n)
    const t = (key: string) => {
        const translations: Record<string, Record<Language, string>> = {
            chatSystem: { en: "Chat System", "zh-Hant": "聊天系統", system: "Chat System" },
            platform: { en: "Secure Messaging Platform", "zh-Hant": "安全通訊平台", system: "Secure Messaging Platform" },
            welcome: { en: "Welcome to Chat Box", "zh-Hant": "歡迎來到聊天室", system: "Welcome to Chat Box" },
            username: { en: "Please input your username", "zh-Hant": "請輸入用戶名", system: "Please input your username" },
            password: { en: "Please input your password", "zh-Hant": "請輸入密碼", system: "Please input your password" },
            enterChatroom: { en: "Enter Chatroom", "zh-Hant": "進入聊天室", system: "Enter Chatroom" },
            settings: { en: "Settings", "zh-Hant": "設定", system: "Settings" },
            appearance: { en: "Appearance", "zh-Hant": "外觀", system: "Appearance" },
            systemDefault: { en: "System Default", "zh-Hant": "系統預設", system: "System Default" },
            light: { en: "Light", "zh-Hant": "淺色", system: "Light" },
            dark: { en: "Dark", "zh-Hant": "深色", system: "Dark" },
            language: { en: "Language", "zh-Hant": "語言", system: "Language" },
            english: { en: "English", "zh-Hant": "英文", system: "English" },
            chineseTraditional: { en: "Chinese (Traditional)", "zh-Hant": "中文（繁體）", system: "Chinese (Traditional)" },
            fontSize: { en: "Font Size", "zh-Hant": "字體大小", system: "Font Size" },
            small: { en: "Small", "zh-Hant": "小", system: "Small" },
            medium: { en: "Medium", "zh-Hant": "中", system: "Medium" },
            large: { en: "Large", "zh-Hant": "大", system: "Large" },
        };

        return translations[key]?.[language] || translations[key]?.en || key;
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                backgroundColor: colors.background,
                color: colors.text,
                fontFamily: "'Segoe UI', system-ui, sans-serif",
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
                        fontSize: "1.5rem" + " * " + fontScale,
                    }}
                >
                    💬  {t("chatSystem")}
                </h1>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div
                        style={{
                            fontSize: "0.9rem" + " * " + fontScale,
                            opacity: 0.8,
                        }}
                    >
                        {t("platform")}
                    </div>
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        style={{
                            background: "transparent",
                            border: "1px solid white",
                            color: "white",
                            padding: "0.5rem 1rem",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "0.9rem" + " * " + fontScale,
                        }}
                    >
                        ⚙️ {t("settings")}
                    </button>
                </div>
            </div>

            {showSettings ? (
                <div style={{ flex: 1, padding: "2rem" }}>
                    <div
                        style={{
                            backgroundColor: colors.cardBg,
                            borderRadius: 12,
                            padding: "1.5rem",
                            border: `1px solid ${colors.border}`,
                            maxWidth: 800,
                            margin: "0 auto",
                        }}
                    >
                        {/* Theme Selection */}
                        <div style={{ marginBottom: "2rem" }}>
                            <h3 style={{ fontSize: 18 * fontScale, marginBottom: "1rem" }}>{t("appearance")}</h3>
                            {["systemDefault", "light", "dark"].map((mode) => (
                                <label
                                    key={mode}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "0.75rem 0",
                                        cursor: "pointer",
                                    }}
                                >
                                    <span style={{ fontSize: 16 * fontScale }}>{t(mode)}</span>
                                    <input
                                        type="radio"
                                        name="theme"
                                        checked={theme === mode}
                                        onChange={() => setTheme(mode as Theme)}
                                    />
                                </label>
                            ))}
                        </div>

                        {/* Language Selection */}
                        <div style={{ marginBottom: "2rem" }}>
                            <h3 style={{ fontSize: 18 * fontScale, marginBottom: "1rem" }}>{t("language")}</h3>
                            {[
                                { value: "system", label: t("systemDefault") },
                                { value: "en", label: t("english") },
                                { value: "zh-Hant", label: t("chineseTraditional") },
                            ].map((lang) => (
                                <label
                                    key={lang.value}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "0.75rem 0",
                                        cursor: "pointer",
                                    }}
                                >
                                    <span style={{ fontSize: 16 * fontScale }}>{lang.label}</span>
                                    <input
                                        type="radio"
                                        name="language"
                                        checked={language === lang.value}
                                        onChange={() => setLanguage(lang.value as Language)}
                                    />
                                </label>
                            ))}
                        </div>

                        {/* Font Size Selection */}
                        <div>
                            <h3 style={{ fontSize: 18 * fontScale, marginBottom: "1rem" }}>{t("fontSize")}</h3>
                            <input
                                type="range"
                                min="0"
                                max="2"
                                step="1"
                                value={fontSizeMap[fontSize]}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    setFontSize(
                                        value === 0 ? "small" : value === 1 ? "medium" : "large"
                                    );
                                }}
                                style={{ width: "100%" }}
                            />
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginTop: "0.5rem",
                                }}
                            >
                                <span>{t("small")}</span>
                                <span>{t("medium")}</span>
                                <span>{t("large")}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem" }}>
                    <h1 style={{ fontSize: "2rem" + " * " + fontScale, marginBottom: "2rem" }}>{t("welcome")}</h1>
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            width: "100%",
                            maxWidth: "400px",
                        }}
                    >
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder={t("username")}
                            style={{
                                padding: "0.75rem",
                                fontSize: "1rem" + " * " + fontScale,
                                borderRadius: "4px",
                                border: `1px solid ${colors.border}`,
                                backgroundColor: colors.cardBg,
                                color: colors.text,
                            }}
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={t("password")}
                            style={{
                                padding: "0.75rem",
                                fontSize: "1rem" + " * " + fontScale,
                                borderRadius: "4px",
                                border: `1px solid ${colors.border}`,
                                backgroundColor: colors.cardBg,
                                color: colors.text,
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                padding: "0.75rem",
                                fontSize: "1rem" + " * " + fontScale,
                                backgroundColor: colors.primary,
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            {t("enterChatroom")}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

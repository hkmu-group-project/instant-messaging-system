import React, { useState, useEffect } from "react";

// Type for theme
type Theme = "light" | "dark" | "system";
type Language = "en" | "zh-Hant" | "system";
type FontSize = "small" | "medium" | "large";

export default function SettingsPage() {
  // State with localStorage persistence
  const [theme, setTheme] = useState<Theme>(() => 
    (localStorage.getItem("theme") as Theme) || "system"
  );
  const [language, setLanguage] = useState<Language>(() =>
    (localStorage.getItem("language") as Language) || "system"
  );
  const [fontSize, setFontSize] = useState<FontSize>(() =>
    (localStorage.getItem("fontSize") as FontSize) || "medium"
  );

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

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
  const fontSizeValue = fontSizeMap[fontSize];
  const fontScale = fontSize === "small" ? 0.9 : fontSize === "medium" ? 1 : 1.15;

  // Handle font size change
  const handleFontSizeChange = (value: number) => {
    const newSize = value === 0 ? "small" : value === 1 ? "medium" : "large";
    setFontSize(newSize);
  };

  // Handle logout
  const handleLogout = () => {
    alert("Logged out successfully!");
    // Add navigation or auth clear logic here
  };

  // Get effective language (similar to effectiveTheme)
  const effectiveLanguage = language === "system"
    ? navigator.language.startsWith("zh") ? "zh-Hant" : "en"
    : language;

  // Translations (simple mock i18n)
  const t = (key: string) => {
    const translations: Record<string, Record<Language, string>> = {
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
      previewText: { en: "The quick brown fox jumps over the lazy dog.", "zh-Hant": "快速的棕色狐狸跳過懶狗。", system: "Preview" },
      logout: { en: "Logout", "zh-Hant": "登出", system: "Logout" },
      platform: { en: "Secure Messaging Platform", "zh-Hant": "安全通訊平台", system: "Secure Messaging Platform" },
      chatSystem: { en: "Chat System", "zh-Hant": "聊天系統", system: "Chat System" },
    };

    return translations[key]?.[effectiveLanguage] || translations[key]?.en || key;
  };

  // Listen to system theme changes
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setTheme("system"); // Trigger re-render
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [theme]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
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
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Chat System</h1>
        <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>Secure Messaging Platform</div>
      </div>

      {/* Settings Content */}
      <div
        style={{
          flex: 1,
          padding: "2rem",
          maxWidth: 800,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <h2 style={{ fontSize: 24 * fontScale, marginBottom: "2rem", fontWeight: 600 }}>
          Settings
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

          {/* Appearance Card */}
          <div
            style={{
              backgroundColor: colors.cardBg,
              borderRadius: 12,
              padding: "1.5rem",
              border: `1px solid ${colors.border}`,
            }}
          >
            <h3 style={{ fontSize: 18 * fontScale, margin: "0 0 1rem 0", fontWeight: 600 }}>
              {t("appearance")}
            </h3>

            {["system", "light", "dark"].map((mode) => (
              <label
                key={mode}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem 0",
                  borderBottom:
                    mode !== "dark" ? `1px solid ${colors.border}` : "none",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                <span style={{ fontSize: 16 * fontScale }}>
                  {t(mode as keyof typeof t)}
                </span>
                <input
                  type="radio"
                  name="theme"
                  checked={theme === mode}
                  onChange={() => setTheme(mode as Theme)}
                  style={{
                    width: 18,
                    height: 18,
                    accentColor: colors.primary,
                  }}
                />
              </label>
            ))}
          </div>

          {/* Language Card */}
          <div
            style={{
              backgroundColor: colors.cardBg,
              borderRadius: 12,
              padding: "1.5rem",
              border: `1px solid ${colors.border}`,
            }}
          >
            <h3 style={{ fontSize: 18 * fontScale, margin: "0 0 1rem 0", fontWeight: 600 }}>
              {t("language")}
            </h3>

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
                  borderBottom:
                    lang.value !== "zh-Hant" ? `1px solid ${colors.border}` : "none",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                <span style={{ fontSize: 16 * fontScale }}>{lang.label}</span>
                <input
                  type="radio"
                  name="language"
                  checked={language === lang.value}
                  onChange={() => setLanguage(lang.value as Language)}
                  style={{
                    width: 18,
                    height: 18,
                    accentColor: colors.primary,
                  }}
                />
              </label>
            ))}
          </div>

          {/* Font Size Card */}
          <div
            style={{
              backgroundColor: colors.cardBg,
              borderRadius: 12,
              padding: "1.5rem",
              border: `1px solid ${colors.border}`,
            }}
          >
            <h3 style={{ fontSize: 18 * fontScale, margin: "0 0 1rem 0", fontWeight: 600 }}>
              {t("fontSize")}
            </h3>

            <div style={{ marginBottom: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                {["small", "medium", "large"].map((size) => (
                  <span
                    key={size}
                    style={{
                      fontSize: 14 * fontScale,
                      color: colors.mutedText,
                    }}
                  >
                    {t(size)}
                  </span>
                ))}
              </div>

              <input
                type="range"
                min="0"
                max="2"
                step="1"
                value={fontSizeValue}
                onChange={(e) => handleFontSizeChange(Number(e.target.value))}
                style={{
                  width: "100%",
                  accentColor: colors.primary,
                }}
              />
            </div>

            <p
              style={{
                margin: "1rem 0 0",
                fontSize: 16 * fontScale,
                color: colors.mutedText,
                textAlign: "center",
              }}
            >
              {t("previewText")}
            </p>
          </div>

          {/* Logout Card */}
          <div
            style={{
              backgroundColor: colors.cardBg,
              borderRadius: 12,
              padding: "1.5rem",
              border: `1px solid ${colors.border}`,
            }}
          >
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: "#e74c3c",
                color: "white",
                border: "none",
                borderRadius: 8,
                fontSize: 16 * fontScale,
                fontWeight: 500,
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#c0392b")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#e74c3c")}
            >
              {t("logout")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

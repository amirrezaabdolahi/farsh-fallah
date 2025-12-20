"use client";

import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

const ThemeContext = createContext();

const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
});

export function ThemeContextProvider({ children }) {
    const [mode, setMode] = useState("light");

    const theme = useMemo(() => {
        return createTheme({
            direction: "rtl",
            palette: {
                mode,
            },
            typography: {
                fontFamily: "Vazirmatn, Arial, sans-serif",
            },
        });
    }, [mode]);

    useEffect(() => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(mode);
    }, [mode]);

    const toggleMode = () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ mode, toggleMode }}>
            <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </CacheProvider>
        </ThemeContext.Provider>
    );
}

export const useThemeContext = () => useContext(ThemeContext);

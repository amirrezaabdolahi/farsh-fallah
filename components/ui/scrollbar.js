export const horizontalScrollSx = {
    overflowX: "auto",
    scrollbarWidth: "thin", // Firefox
    scrollbarColor: "#cbd5e1 transparent",

    "&::-webkit-scrollbar": {
        height: 6,
    },

    "&::-webkit-scrollbar-track": {
        background: "transparent",
    },

    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#cbd5e1",
        borderRadius: 8,
    },

    "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#94a3b8",
    },

    // smooth touch scrolling (iOS)
    WebkitOverflowScrolling: "touch",
};
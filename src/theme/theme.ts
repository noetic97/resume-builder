export const theme = {
  colors: {
    primary: {
      main: "#3b82f6", // blue-500
      light: "#93c5fd", // blue-300
      dark: "#1d4ed8", // blue-700
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#4b5563", // gray-600
      light: "#9ca3af", // gray-400
      dark: "#1f2937", // gray-800
      contrastText: "#ffffff",
    },
    error: {
      main: "#ef4444", // red-500
      light: "#fca5a5", // red-300
      dark: "#b91c1c", // red-700
      contrastText: "#ffffff",
    },
    warning: {
      main: "#f59e0b", // amber-500
      contrastText: "#000000",
    },
    info: {
      main: "#3b82f6", // blue-500
      contrastText: "#ffffff",
    },
    success: {
      main: "#10b981", // emerald-500
      contrastText: "#ffffff",
    },
    text: {
      primary: "#111827", // gray-900
      secondary: "#4b5563", // gray-600
      disabled: "#9ca3af", // gray-400
    },
    background: {
      paper: "#ffffff",
      default: "#f3f4f6", // gray-100
    },
    divider: "#e5e7eb", // gray-200

    // Resume template colors
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
    blue: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
    },
    purple: {
      50: "#f5f3ff",
      100: "#ede9fe",
      300: "#c4b5fd",
      500: "#8b5cf6",
      600: "#7c3aed",
      700: "#6d28d9",
      800: "#5b21b6",
      900: "#4c1d95",
    },
    indigo: {
      50: "#eef2ff",
      900: "#312e81",
    },
    white: "#ffffff",
  },
  spacing: (multiplier: number) => `${multiplier * 0.25}rem`,
  borderRadius: {
    sm: "0.125rem", // 2px
    md: "0.25rem", // 4px
    lg: "0.375rem", // 6px
    xl: "0.5rem", // 8px
    "2xl": "0.75rem", // 12px
    "3xl": "1rem", // 16px
    full: "9999px",
  },
  typography: {
    fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    lg: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    xl: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    "2xl":
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  media: {
    sm: `@media (min-width: 640px)`,
    md: `@media (min-width: 768px)`,
    lg: `@media (min-width: 1024px)`,
    xl: `@media (min-width: 1280px)`,
    "2xl": `@media (min-width: 1536px)`,
  },
};

export type Theme = typeof theme;

import { createTheme } from "@mui/material/styles";

//* Zentrale Farben für beide Modi.
//* Nur hier stehen feste Farbwerte – alle Bausteine holen sich ihre Farben aus dem Theme.
const colors = {
  dark: {
    primary: "#5b8def",
    onPrimary: "#0f141a",
    background: "#0f141a",
    paper: "#161d26",
    border: "#232c37",
    text: "#e6e8eb",
    textSecondary: "#8b95a1",
  },
  light: {
    primary: "#3567d6",
    onPrimary: "#ffffff",
    background: "#f6f7f9",
    paper: "#ffffff",
    border: "#e3e6ea",
    text: "#111827",
    textSecondary: "#5b6472",
  },
};

export const getTheme = (mode) => {
  const c = colors[mode] || colors.dark;

  return createTheme({
    palette: {
      mode,
      //* Dunkler Text auf dem hellen Blau im Dunkel-Modus = besserer Kontrast
      primary: { main: c.primary, contrastText: c.onPrimary },
      background: { default: c.background, paper: c.paper },
      divider: c.border,
      text: { primary: c.text, secondary: c.textSecondary },
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily:
        '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 700 },
      h4: { fontWeight: 700 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { fontWeight: 600 },
    },
    components: {
      MuiPaper: {
        styleOverrides: { root: { backgroundImage: "none" } },
      },
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: { border: `1px solid ${c.border}` },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { textTransform: "none", fontWeight: 600, borderRadius: 8 },
        },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0, color: "inherit" },
        styleOverrides: {
          root: {
            backgroundColor: c.background,
            color: c.text,
            borderBottom: `1px solid ${c.border}`,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 999, fontWeight: 500 },
          sizeSmall: { height: 22, fontSize: "0.72rem" },
        },
      },
    },
  });
};

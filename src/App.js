import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/NavBar";
import AppRouter from "./router/AppRouter";
import store, { persistor } from "./app/store";
import Footer from "./components/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline"

function App() {
  const [prefersDarkMode, setPrefersDarkMode] = useState(true);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
          <CssBaseline />
            <Navbar
              setPrefersDarkMode={setPrefersDarkMode}
              prefersDarkMode={prefersDarkMode}
            />
            <AppRouter />
            <Footer prefersDarkMode={prefersDarkMode} />
          </Router>
        </PersistGate>
      </Provider>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={2}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Router>
        <App />
      </Router>
    </SnackbarProvider>
  </Provider>
);

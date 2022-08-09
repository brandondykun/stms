import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { UsersContextProvider } from "./context/UsersContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <UsersContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UsersContextProvider>
  </AuthContextProvider>
  // </React.StrictMode>
);

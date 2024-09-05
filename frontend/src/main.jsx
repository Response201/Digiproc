import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/style.scss"; // Importing SCSS for styles
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { GlobalProvider } from "./context/GlobalContext";

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    {/* GlobalProvider - Provides global states */}
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </React.StrictMode>
);

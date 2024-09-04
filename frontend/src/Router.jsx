import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import {Layout} from "./pages/Layout"; 
import {Home} from "./pages/Home";     
import {NotFound} from "./pages/NotFound"; 
import "./scss/style.scss";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
    ],
  },
]);

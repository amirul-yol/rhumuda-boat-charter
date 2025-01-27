import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Header from "./components/Header";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <>
          <Header />
          <Layout>
            <HomePage />
          </Layout>
        </>
      ),
    },
    {
      path: "/test",
      element: (
        <>
          <Header />
          <Layout>
            <TestPage />
          </Layout>
        </>
      ),
    },
  ],
  {
    future: {
      unstable_useBlocker: true,
      unstable_useTransition: true,
    },
  }
);

const App: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  );
};

export default App;

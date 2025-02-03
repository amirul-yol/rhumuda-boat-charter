import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Header from "./components/Header";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import InquiryPage from "./pages/InquiryPage";
import SummaryPage from "./pages/SummaryPage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";

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
      path: "/about",
      element: (
        <>
          <Header />
          <Layout>
            <AboutUsPage />
          </Layout>
        </>
      ),
    },
    {
      path: "/contact",
      element: (
        <>
          <Header />
          <Layout>
            <ContactUsPage />
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
    {
      path: "/inquiry",
      element: (
        <>
          <Header />
          <Layout>
            <InquiryPage />
          </Layout>
        </>
      ),
    },
    {
      path: "/summary",
      element: (
        <>
          <Header />
          <Layout>
            <SummaryPage />
          </Layout>
        </>
      ),
    },
  ],
  { basename: "/" }
);

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  );
};

export default App;

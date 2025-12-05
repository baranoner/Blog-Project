import React from "react";
import { Outlet } from "react-router";
import MyNavbar from "./MyNavbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <MyNavbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
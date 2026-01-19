import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grow mx-14">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;

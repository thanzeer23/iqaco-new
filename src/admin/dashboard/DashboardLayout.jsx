import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import AdminSideBar from "../sidebar/AdminSideBar";
import { useColorModes } from "@coreui/react";
import { useSelector } from "react-redux";
import { CToaster, CToast } from "@coreui/react";
import "../scss/style.scss";
import showToast from "../../helper/toastFunction";
const DashboardLayout = () => {
  const [toast, addToast] = useState(0);
  const toaster = useRef();
  const { isColorModeSet, setColorMode } = useColorModes(
    "coreui-free-react-admin-template-theme"
  );
  const storedTheme = useSelector((state) => state.theme);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split("?")[1]);
    const theme =
      urlParams.get("theme") &&
      urlParams.get("theme").match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode(theme);
    }

    if (isColorModeSet()) {
      return;
    }

    setColorMode(storedTheme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <AdminSideBar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <Header />

        <div className="body flex-grow-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

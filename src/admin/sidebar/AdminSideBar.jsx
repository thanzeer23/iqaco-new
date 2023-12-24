import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarNav,
  CSidebarToggler,
  CImage,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { AppSidebarNav } from "./AppSidebarNav";

import logo from "../../assets/logo.png";
import { sygnet } from "../assets/brand/sygnet";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

// sidebar nav config
import navigation from "./_nav";
import { setHeader } from "../redux/useReducer";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.settings.sidebarShow);

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(setHeader(visible));
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <div
            style={{
              display: "flex",
              width: "200px",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <CImage
              rounded
              thumbnail
              src={logo}
              width={"70px"}
              height={"70px"}
            />

            <h2
              style={{
                fontSize: "x-large",
                fontWeight: "700",
                marginTop: "1rem",
              }}
            >
              Mahaguru
            </h2>
          </div>
          <CIcon
            customClassName="sidebar-brand-narrow"
            icon={sygnet}
            height={32}
          />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch(setHeader(false))}
        />
      </CSidebarHeader>

      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() =>
            dispatch({ type: "set", sidebarUnfoldable: !unfoldable })
          }
        />
      </CSidebarFooter>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);

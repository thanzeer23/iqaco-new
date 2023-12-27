import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilDescription,
  cilNotes,
  cilPencil,
  cilSpeedometer,
  cilCamera,
  cilFile,
} from "@coreui/icons";
import { CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/admin/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "SECTIONS",
  },
  {
    component: CNavItem,
    name: "Create Sections",
    to: "admin/create-section",
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Edit Sections",
    to: "/admin/edit-sections",
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "PAGE",
  },
  {
    component: CNavItem,
    name: "Create Page",
    to: "/admin/create-page",
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Edit Page",
    to: "/admin/edit-pages",
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "IMAGE",
  },
  {
    component: CNavItem,
    name: "Create Image",
    to: "/admin/create-image",
    icon: <CIcon icon={cilCamera} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Images",
    to: "/admin/view-images",
    icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
  },
];

export default _nav;

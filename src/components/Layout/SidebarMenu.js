import React from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";

const SidebarMenu = () => {
  const { collapseSidebar } = useProSidebar();

  return (
    <Sidebar style={{ height: "100vh" }}>
      <Menu>
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            collapseSidebar();
          }}
          style={{ textAlign: "center" }}
        >
          {" "}
          <h2>Main Menu</h2>
        </MenuItem>
        <MenuItem
          onClick={() => (window.location.pathname = "/")}
          icon={<HomeOutlinedIcon />}
        >
          Home
        </MenuItem>
        <MenuItem
          onClick={() => (window.location.pathname = "/appObjects")}
          icon={<WidgetsOutlinedIcon />}
        >
          App Objects
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarMenu;

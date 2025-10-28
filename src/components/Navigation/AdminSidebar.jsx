// AdminSidebar.jsx
import React from "react";
import { Sidebar, Menu } from "react-pro-sidebar";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomNavLink from "./NavItem";
import ICONS from "../../constants/iconConstants";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: ICONS.DASHBOARD,
    activeIcon: ICONS.DASHBOARD_ACTIVE,
  },
  {
    name: "Company Profile",
    path: "/company/profile",
    icon: ICONS.COMPANY_PROFILE,
    activeIcon: ICONS.COMPANY_PROFILE_ACTIVE,
  },
  {
    name: "All Departments",
    path: "/departments",
    icon: ICONS.ALL_DEPARTMENTS,
    activeIcon: ICONS.ALL_DEPARTMENTS_ACTIVE,
  },
  {
    name: "All Employees",
    path: "/employees",
    icon: ICONS.ALL_EMPLOYEES,
    activeIcon: ICONS.ALL_EMPLOYEES_ACTIVE,
  },
  {
    name: "Attendance",
    path: "/attendances",
    icon: ICONS.ATTENDANCES,
    activeIcon: ICONS.ATTENDANCES_ACTIVE,
  },
  {
    name: "Leaves",
    path: "/leaves",
    icon: ICONS.LEAVES,
    activeIcon: ICONS.LEAVES_ACTIVE,
  },
  {
    name: "Holidays",
    path: "/holidays",
    icon: ICONS.HOLIDAYS,
    activeIcon: ICONS.HOLIDAYS_ACTIVE,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: ICONS.SETTINGS,
    activeIcon: ICONS.SETTINGS_ACTIVE,
  },
];

const StyleSidebar = (theme) => ({
  width: "100%",
  height: "100vh",
  backgroundColor: theme.palette.secondary.lightGrayOpacity5,
  borderRadius: "20px",
  padding: "10px",
});

const StyleImg = (theme) => ({
  display: "flex",
  justifyContent: "center",
  m: 2,
  pr: 8,
});

const AdminSidebar = () => {
  const theme = useTheme();

  const handleMouseEnter = (e) => {
    if (!e.currentTarget.classList.contains("active")) {
      e.currentTarget.style.backgroundColor =
        theme.palette.secondary.lightGrayOpacity20;
    }
  };

  const handleMouseLeave = (e) => {
    if (!e.currentTarget.classList.contains("active")) {
      e.currentTarget.style.backgroundColor = "transparent";
    }
  };

  return (
    <Sidebar style={{ border: "none" }}>
      <Box sx={StyleSidebar}>
        <Menu>
          {menuItems.map((item) => (
            <CustomNavLink
              key={item.name}
              name={item.name}
              path={item.path}
              icon={item.icon}
              activeIcon={item.activeIcon}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          ))}
        </Menu>
      </Box>
    </Sidebar>
  );
};

export default AdminSidebar;

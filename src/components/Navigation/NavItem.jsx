// CustomNavLink.jsx
import React from "react";
import { Link } from "react-router-dom";
import { MenuItem } from "react-pro-sidebar";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

const CustomNavLink = ({
  name,
  path,
  icon,
  activeIcon,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  const theme = useTheme();
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <MenuItem
      component={<Link to={path} />}
      icon={
        <img
          src={isActive ? activeIcon : icon}
          alt={name}
          style={{
            height: "24px",
            width: "24px",
          }}
        />
      }
      style={{
        backgroundColor: isActive
          ? theme.palette.primary.lightPrimary5
          : "transparent",
        color: isActive
          ? theme.palette.primary.main
          : theme.palette.text.primary,
        borderLeft: isActive
          ? `4px solid ${theme.palette.primary.main}`
          : "none",
        borderRadius: "0 12px 12px 0",
        fontWeight: isActive
          ? theme.typography.fontWeightMedium
          : theme.typography.fontWeightLight,
        transition: "all 0.15s ease",
      }}
      // Hapus hover style manual jika react-pro-sidebar sudah menanganinya, 
      // atau gunakan CSS class untuk hover state
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {name}
    </MenuItem>
  );
};

export default CustomNavLink;
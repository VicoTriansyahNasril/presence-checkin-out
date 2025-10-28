import React, { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { fetchSuperadmin } from "../redux/slices/superadminSlice";

const ProfileCard = ({
  isSuperadmin = false,
  userName,
  userRole,
  userPicture,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useAuth();
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch data superadmin jika isSuperadmin true
  const superadminDetail = useSelector((state) => state.superadmin.data);

  useEffect(() => {
    if (isSuperadmin) {
      dispatch(fetchSuperadmin());
    }
  }, [dispatch, isSuperadmin]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate("/administrator/profile");
    handleMenuClose();
  };

  const handleLogout = () => {
    logout(); // Panggil fungsi logout dari AuthContext
    handleMenuClose();
  };

  // Tentukan data pengguna yang akan ditampilkan
  const displayName = isSuperadmin
    ? superadminDetail
      ? superadminDetail.data.name
      : "Loading..."
    : userName;

  const displayRole = isSuperadmin ? "Super Admin" : userRole;

  return (
    <Box sx={classes.profileCard}>
      <Avatar
        alt={displayName}
        src={isSuperadmin ? "/path-to-image/avatar.jpg" : userPicture} // Avatar default untuk superadmin
        sx={classes.avatar}
      />
      <Box sx={classes.userInfo}>
        <Typography
          sx={{ fontWeight: "fontWeightRegular", fontSize: "fontSizeSmall" }}
        >
          {displayName}
        </Typography>
        <Typography
          sx={{
            fontWeight: "fontWeightRegular",
            fontSize: "fontSizeExtraSmall",
          }}
          color="text.secondary"
        >
          {displayRole}
        </Typography>
      </Box>
      <IconButton size="small" onClick={handleMenuOpen}>
        <ExpandMoreIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {!isSuperadmin && (
          <MenuItem onClick={handleProfileClick}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </MenuItem>
        )}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: "red" }} />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{ sx: { color: "red" } }}
          />
        </MenuItem>
      </Menu>
    </Box>
  );
};

const useStyles = () => {
  return {
    profileCard: {
      border: "2px solid #A2A1A833",
      display: "flex",
      alignItems: "center",
      padding: "6px",
      borderRadius: "12px",
      bgColor: "white",
      width: "auto",
      height: "50px",
      py: "25px",
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: "8px",
    },
    userInfo: {
      ml: 1.5,
      flexGrow: 1,
    },
  };
};

export default ProfileCard;

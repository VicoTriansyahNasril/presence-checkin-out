import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const CustomLoader = ({ loading, withBackground = true }) => {
  if (!loading) return null;

  if (withBackground) {
    return (
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default CustomLoader;

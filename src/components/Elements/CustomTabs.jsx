import React from "react";
import { Tabs, Tab } from "@mui/material";
import PropTypes from "prop-types";

const CustomTabs = ({ value, onChange, tabs }) => {
  return (
    <Tabs
      value={value}
      onChange={onChange}
      indicatorColor="primary"
      textColor="primary"
      sx={useStyles.tabs}
    >
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          icon={
            <img
              src={value === index ? tab.iconActive : tab.icon}
              alt={`${tab.label} Icon`}
              style={useStyles.icon}
            />
          }
          iconPosition="start"
          label={tab.label}
          sx={{
            textTransform: "none",
            fontSize: "fontSizeSmall",
            fontWeight:
              value === index ? "fontWeightMedium" : "fontWeightLight",
          }}
        />
      ))}
    </Tabs>
  );
};

CustomTabs.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      iconActive: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const useStyles = {
  tabs: {
    borderBottom: "1px solid #ddd",
    height: "60px",
    display: "flex",
  },
  icon: {
    width: "20px",
    height: "20px",
    alignItems: "center",
  },
};

export default CustomTabs;

import React from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ searchValue, onSearchChange }) => {
  return (
    <Box sx={useStyles.boxSearch}>
      <TextField
        placeholder="Search"
        value={searchValue}
        onChange={onSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={useStyles.input}
      />
    </Box>
  );
};

const useStyles = {
  input: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
    },
  },
  boxSearch: {
    height: "50px",
  },
};

export default SearchBar;

import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
  Box,
  Typography,
  Modal,
} from "@mui/material";
import Visibility from "/assets/icons/view.svg";
import VisibilityOff from "/assets/icons/hide.svg";
import ArrowDropDownIcon from "/assets/icons/arrow-down.svg";
import ArrowDropUpIcon from "/assets/icons/arrow-up.svg";
import CloseIcon from "@mui/icons-material/Close";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import FileUploadIcon from "/assets/icons/file-upload.svg";
import FileDocIcon from "/assets/icons/file-doc.svg";
import CalendarIcon from "/assets/icons/calendar.svg";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

const CustomInput = ({
  label,
  type,
  options = [],
  value,
  name,
  onChange,
  fileType,
  hideLabel = false,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value ? dayjs(value) : null);

  useEffect(() => {
    if (value && type === "date") {
      setSelectedDate(dayjs(value));
    }
  }, [value, type]);

  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleSelectOpen = () => {
    setIsSelectOpen(true);
  };

  const handleSelectClose = () => {
    setIsSelectOpen(false);
  };

  const handleFileChange = (file) => {
    const maxFileSize = 2 * 1024 * 1024;
    const validFormats =
      fileType === "image"
        ? ["image/png", "image/jpeg", "image/jpg"]
        : [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "text/csv",
          ];

    if (!file) {
      setSelectedFile(null);
      setError("File is required.");
      onChange?.({ target: { name: "fileField", files: [] } });
      return;
    }

    if (file) {
      if (!validFormats.includes(file.type)) {
        setSelectedFile(null);
        setError(
          fileType === "image"
            ? "Please upload a valid image file (.jpg, .jpeg, .png)."
            : "Please upload a valid .xlsx or .csv file."
        );
      } else if (file.size > maxFileSize) {
        setSelectedFile(null);
        setError("File size must be less than 2MB.");
      } else {
        setSelectedFile(file);
        setError("");
        onChange?.({ target: { name: "fileField", files: [file] } });
      }
    }
  };

  const handleInputFileChange = (event) => {
    const file = event.target.files[0];
    if (file) handleFileChange(file);
  };

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleFileChange(event.dataTransfer.files[0]);
  };

  const handleFileClick = (event) => {
    event.stopPropagation();
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      const link = document.createElement("a");
      link.href = url;
      link.download = selectedFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const handleRemoveFile = (event) => {
    event.stopPropagation();
    setSelectedFile(null);
    setError("");
    onChange?.({ target: { name: "fileField", files: [] } });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDatePickerOpen = () => {
    setIsDatePickerOpen(true);
  };

  const handleDatePickerClose = () => {
    setIsDatePickerOpen(false);
  };

  const handleDateChange = (newValue) => {
    if (newValue) {
      const dayjsValue = dayjs(newValue);
      const formattedDate = dayjsValue.format("YYYY-MM-DD");
      console.log("format tanggal", formattedDate);
      setSelectedDate(dayjsValue);
      onChange?.({ target: { name, value: formattedDate } });
      setTimeout(() => {
        handleDatePickerClose();
      }, 100);
    } else {
      setSelectedDate(null);
      onChange?.({ target: { name, value: "" } });
    }
  };

  const getStyles = () => {
    const baseStyles = {
      common: {},
      input: {
        sx: {
          borderRadius: "10px",
        },
      },
    };

    if (!hideLabel) {
      baseStyles.common = {
        "& .MuiInputLabel-shrink": {
          color: "primary.main",
          fontWeight: "fontWeightLight",
          transform: "translate(14px, 10px) scale(0.7)",
        },
      };
      baseStyles.input = {
        notched: false,
        sx: {
          "& input, & .MuiSelect-select": {
            paddingTop: "27px",
            paddingBottom: "7px",
          },
          borderRadius: "10px",
        },
      };
    }

    return baseStyles;
  };

  const styles = getStyles();

  const renderTextField = () => (
    <TextField
      label={hideLabel ? "" : label}
      type={type === "password" ? (showPassword ? "text" : "password") : type}
      variant="outlined"
      margin="normal"
      name={name}
      sx={styles.common}
      value={value}
      onChange={onChange}
      InputProps={{
        ...styles.input,
        ...(type === "password" && {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                <img
                  src={showPassword ? VisibilityOff : Visibility}
                  alt={showPassword ? "Hide password" : "Show password"}
                  style={{ width: 24, height: 24 }}
                />
              </IconButton>
            </InputAdornment>
          ),
        }),
      }}
      {...rest}
    />
  );

  const renderDate = () => (
    <>
      <TextField
        label={hideLabel ? "" : label}
        type="text"
        variant="outlined"
        margin="normal"
        name={name}
        sx={styles.common}
        value={selectedDate ? selectedDate.format("MMMM DD, YYYY") : ""}
        InputProps={{
          ...styles.input,
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleDatePickerOpen}>
                <img
                  src={CalendarIcon}
                  alt="Calendar"
                  style={{ width: 24, height: 24 }}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...rest}
      />
      <Modal
        open={isDatePickerOpen}
        onClose={handleDatePickerClose}
        aria-labelledby="date-picker-modal"
        aria-describedby="date-picker-modal-description"
      >
        <Box sx={useStyles.modal}>
          <DateCalendar
            value={selectedDate ? selectedDate.toDate() : null}
            onChange={handleDateChange}
          />
        </Box>
      </Modal>
    </>
  );

  const renderSelect = () => (
    <TextField
      select
      label={hideLabel ? "" : label}
      variant="outlined"
      margin="normal"
      name={name}
      sx={{ ...styles.common, ...styles.input.sx }}
      value={value}
      onChange={onChange}
      InputProps={{
        ...styles.input,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleSelectOpen} edge="end">
              <img
                src={isSelectOpen ? ArrowDropUpIcon : ArrowDropDownIcon}
                alt={isSelectOpen ? "Close options" : "Open options"}
                style={{ width: 24, height: 24 }}
              />
            </IconButton>
          </InputAdornment>
        ),
      }}
      SelectProps={{
        MenuProps: {
          ...useStyles.select.menu,
        },
        IconComponent: () => null,
        open: isSelectOpen,
        onOpen: handleSelectOpen,
        onClose: handleSelectClose,
      }}
      {...rest}
    >
      {options.map((option, index) => (
        <MenuItem key={index} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );

  const renderTimePicker = () => (
    <TimePicker
      label={hideLabel ? "" : label}
      value={value}
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          name={name}
          sx={styles.common}
          InputProps={{ ...styles.input, ...params.InputProps }}
          {...rest}
        />
      )}
    />
  );

  const renderFileUpload = () => (
    <Box
      sx={{
        ...useStyles.fileUpload.box,
        borderColor: error ? "error.main" : "#CFD0DA",
        backgroundColor: isDragging ? "#F0F0F0" : "#FFF",
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleFileUploadClick}
    >
      <Typography sx={useStyles.fileUpload.text}>
        Drag 'n' drop {fileType === "image" ? ".jpg or .png" : ".xlsx or .csv"}{" "}
        file here, or click to select file
      </Typography>
      <Box mt={2}>
        <img src={FileUploadIcon} alt="File Upload" />
      </Box>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        accept={fileType === "image" ? ".jpg,.png" : ".xlsx,.csv"}
        onChange={handleInputFileChange}
      />
      {selectedFile && (
        <Box sx={useStyles.fileUpload.info} onClick={handleFileClick}>
          <img
            src={FileDocIcon}
            alt="File Icon"
            style={{ marginRight: "8px" }}
          />
          <Typography sx={{ flexGrow: 1 }}>{selectedFile.name}</Typography>
          <IconButton onClick={handleRemoveFile}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );

  switch (type) {
    case "select":
      return renderSelect();
    case "time":
      return renderTimePicker();
    case "file":
      return renderFileUpload();
    case "date":
      return renderDate();
    default:
      return renderTextField();
  }
};

const useStyles = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 370,
    bgcolor: "background.paper",
    boxShadow: 24,
    py: 2,
    borderRadius: "10px",
  },
  fileUpload: {
    box: {
      border: "2px dashed",
      borderRadius: "10px",
      padding: 2,
      display: "flex",
      width: "100%",
      height: "200px",
      cursor: "pointer",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      transition: "border-color 0.2s ease",
      backgroundColor: "background.paper",
    },
    info: {
      mt: 2,
      borderRadius: "20px",
      bgcolor: "#CFD0DA",
      p: 1,
      display: "flex",
      alignItems: "center",
      position: "relative",
      cursor: "pointer",
      padding: "8px",
    },
    text: {
      textAlign: "center",
      color: "secondary.main",
    },
  },
  select: {
    menu: {
      PaperProps: {
        style: { maxHeight: 200 },
      },
    },
  },
};

export default CustomInput;

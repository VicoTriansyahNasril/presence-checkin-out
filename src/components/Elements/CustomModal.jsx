import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Backdrop,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "./CustomButton";

const CustomModal = ({ open, onClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: useStyles.backdrop,
      }}
    >
      <Box sx={useStyles.modal}>
        <Box sx={useStyles.content}>{children}</Box>
      </Box>
    </Modal>
  );
};

const HeaderModal = ({ children, onClose }) => {
  return (
    <>
      <Box sx={useStyles.header}>
        <Typography sx={useStyles.headerTittle}>{children}</Typography>

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={useStyles.divider} />
    </>
  );
};

const FooterModal = ({ onClose, onSubmit, children, disableSubmit }) => {
  return (
    <Box sx={useStyles.footer}>
      <CustomButton variant="outlined" onClick={onClose} colorScheme="bgWhite">
        Cancel
      </CustomButton>
      <CustomButton
        variant="contained"
        onClick={onSubmit}
        colorScheme="bgBlue"
        disabled={disableSubmit} // Pastikan tombol Save dinonaktifkan jika disableSubmit adalah true
      >
        {children}
      </CustomButton>
    </Box>
  );
};

CustomModal.Header = HeaderModal;
CustomModal.Footer = FooterModal;

const useStyles = {
  divider: {
    width: "50%",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "732px",
    maxHeight: "90vh", // Batas ketinggian modal sesuai viewport
    overflowY: "auto", // Modal bisa di-scroll jika konten melebihi tinggi maksimum
    transform: "translate(-50%, -50%)",
    backgroundColor: "background.paper",
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
  },
  content: {
    maxHeight: "calc(90vh - 150px)", // Ketinggian konten agar tidak melampaui viewport
    overflowY: "auto", // Konten modal bisa di-scroll
    paddingRight: "16px", // Tambahkan jarak pada sisi kanan untuk memberi ruang bagi scrollbar
  },
  backdrop: {
    backdropFilter: "blur(10px)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
  },
  headerTittle: {
    fontWeight: "fontWeightBold",
    fontSize: "fontSizeMedium",
  },
  footer: {
    display: "flex",
    justifyContent: "right",
    mt: 2,
    gap: 2,
  },
};

export default CustomModal;

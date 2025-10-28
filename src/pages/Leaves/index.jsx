import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Card,
  Avatar,
  Divider,
  IconButton,
  Chip,
  Tooltip,
  Grid,
  Typography,
} from "@mui/material";
import {
  CustomButton,
  TableComponent,
  SearchBar,
  CustomModal,
  DateRangePicker,
  CustomLoader,
} from "../../components/Elements";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllLeaves,
  fetchLeaveDetail,
  updateLeaveStatus,
} from "../../redux/slices/leaveSlice";
import { exportLeave } from "../../services/apis/leaveService";
import Swal from "sweetalert2";
import {
  TABLE_COLUMNS,
  ACTION_BUTTONS,
  STATUS,
  FORMAT_DATE,
} from "../../constants/leavesConstants";
import ICONS from "../../constants/iconConstants";
import COLORS from "../../constants/colorConstants";
import leaveMessages from "../../messages/leaveMessages";

const LeavesList = () => {
  const [dates, setDates] = useState({ startDate: null, endDate: null });
  const [appliedDates, setAppliedDates] = useState({
    startDate: null,
    endDate: null,
  });
  const [searchValue, setSearchValue] = useState("");
  const [modalViewOpen, setModalViewOpen] = useState(false);
  const [modalDateOpen, setModalDateOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const leaves = useSelector((state) => state.leaves.data) || [];
  const dataDetail = useSelector((state) => state.leaves.dataDetail) || [];
  const loading = useSelector((state) => state.leaves.loading);
  const totalData = useSelector((state) => state.leaves.totalData);

  const fetchLeaves = useCallback(() => {
    dispatch(
      fetchAllLeaves({
        page: paginationModel.page,
        size: paginationModel.pageSize,
        keyword: searchValue,
        startDate: appliedDates.startDate
          ? appliedDates.startDate.format(FORMAT_DATE)
          : null,
        endDate: appliedDates.endDate
          ? appliedDates.endDate.format(FORMAT_DATE)
          : null,
      })
    );
  }, [dispatch, paginationModel, searchValue, appliedDates]);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  const handleSearchChange = (event) => setSearchValue(event.target.value);

  const handleDateChange = (startDate, endDate) =>
    setDates({ startDate, endDate });

  const handleDateApply = () => {
    if (!dates.startDate && !dates.endDate) {
      setAppliedDates(dates);
      fetchLeaves();
    } else if (!dates.startDate || !dates.endDate) {
      Swal.fire({
        icon: leaveMessages.SWAL_MESSAGES_DATE.ICON,
        title: leaveMessages.SWAL_MESSAGES_DATE.TITLE,
        text: leaveMessages.SWAL_MESSAGES_DATE.TEXT,
        confirmButtonText: leaveMessages.SWAL_MESSAGES_DATE.CONFIRM_BUTTON,
      });
    } else {
      setAppliedDates(dates);
      fetchLeaves();
    }
    setModalDateOpen(false);
  };

  const handlePaginationModelChange = (newModel) =>
    setPaginationModel(newModel);

  const handleOpenModalView = (idLeave) => {
    setModalViewOpen(true);
    dispatch(fetchLeaveDetail(idLeave));
  };

  const handleStatusUpdate = (idLeave, status) => {
    dispatch(updateLeaveStatus({ idLeave, status }))
      .then(() => {
        Swal.fire(
          leaveMessages.SWAL_MESSAGES_UPDATE.TITLE_SUCCESS,
          leaveMessages.SWAL_MESSAGES_UPDATE.TEXT_SUCCESS(status),
          leaveMessages.SWAL_MESSAGES_UPDATE.ICON_SUCCESS
        );
        fetchLeaves();
      })
      .catch((error) => {
        Swal.fire(
          leaveMessages.SWAL_MESSAGES_UPDATE.TITLE_ERROR,
          leaveMessages.SWAL_MESSAGES_UPDATE.TEXT_ERROR(status),
          leaveMessages.SWAL_MESSAGES_UPDATE.ICON_ERROR
        );
      });
  };

  const handleExportClick = async () => {
    try {
      await exportLeave();
    } catch (error) {
      console.error("Error exporting leave:", error);
    }
  };

  const columns = TABLE_COLUMNS.map((column) => {
    if (column.field === "employeeName") {
      return {
        ...column,
        renderCell: (params) => (
          <Box sx={classes.employeeName}>
            <Avatar
              src={params.row.profilePicture || params.row.employeeName}
              alt={params.row.employeeName}
            />
            {params.row.employeeName}
          </Box>
        ),
      };
    }
    if (column.field === "status") {
      return {
        ...column,
        renderCell: (params) => (
          <Chip
            label={params.value}
            sx={
              params.value === STATUS.APPROVED
                ? classes.chipApproved
                : params.value === STATUS.PENDING
                ? classes.chipPending
                : classes.chipRejected
            }
          />
        ),
      };
    }
    if (column.field === "action") {
      return {
        ...column,
        renderCell: (params) => (
          <Box sx={classes.actionCell}>
            <ActionButton
              icon={ACTION_BUTTONS.ICON_VIEW}
              tooltip={ACTION_BUTTONS.TOOLTIP_VIEW}
              onClick={() => handleOpenModalView(params.row.id_leave)}
            />
            <ActionButton
              icon={ACTION_BUTTONS.ICON_APPROVE}
              tooltip={ACTION_BUTTONS.TOOLTIP_APPROVE}
              onClick={() =>
                handleStatusUpdate(params.row.id_leave, STATUS.APPROVED)
              }
              disabled={params.row.status !== STATUS.PENDING}
            />
            <ActionButton
              icon={ACTION_BUTTONS.ICON_REJECT}
              tooltip={ACTION_BUTTONS.TOOLTIP_REJECT}
              onClick={() =>
                handleStatusUpdate(params.row.id_leave, STATUS.REJECTED)
              }
              disabled={params.row.status !== STATUS.PENDING}
            />
          </Box>
        ),
      };
    }
    return column;
  });

  return (
    <Card variant="outlined" sx={classes.card}>
      <Box sx={classes.header}>
        <SearchBar
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
        />
        <Box sx={classes.buttonGroup}>
          <CustomButton
            colorScheme="bgWhite"
            icon={ICONS.DATE}
            onClick={() => setModalDateOpen(true)}
          >
            Date Filter
          </CustomButton>
          <CustomButton
            colorScheme="bgOrange"
            icon={ICONS.EXPORT}
            onClick={handleExportClick}
          >
            Export
          </CustomButton>
        </Box>
      </Box>
      <Box sx={classes.tableContainer}>
        <TableComponent
          columns={columns}
          rows={leaves}
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationModelChange}
          rowCount={totalData}
          getRowId={(row) => row.id_leave}
        />
      </Box>
      <DateFilterModal
        open={modalDateOpen}
        onClose={() => setModalDateOpen(false)}
        dates={dates}
        onDateChange={handleDateChange}
        onApply={handleDateApply}
      />
      {loading ? (
        <CustomLoader loading={loading} withBackground={false} />
      ) : (
        <LeaveDetailsModal
          open={modalViewOpen}
          onClose={() => setModalViewOpen(false)}
          data={dataDetail}
        />
      )}
    </Card>
  );
};

const ActionButton = ({ icon, tooltip, onClick, disabled }) => {
  const classes = useStyles();
  return (
    <IconButton
      sx={{
        ...classes.iconButton,
        ...(disabled ? classes.iconButtonDisabled : {}),
      }}
      onClick={onClick}
      disabled={disabled}
    >
      <Tooltip title={tooltip}>
        <img
          src={icon}
          alt={tooltip}
          style={{
            ...classes.iconStyle,
            ...(disabled ? classes.iconSvgDisabled : {}),
          }}
        />
      </Tooltip>
    </IconButton>
  );
};

const DateFilterModal = ({ open, onClose, dates, onDateChange, onApply }) => (
  <CustomModal open={open} onClose={onClose}>
    <CustomModal.Header onClose={onClose}>Date Filter</CustomModal.Header>
    <Divider />
    <DateRangePicker
      onDateChange={onDateChange}
      startDate={dates.startDate}
      endDate={dates.endDate}
    />
    <CustomModal.Footer onClose={onClose} onSubmit={onApply}>
      Apply
    </CustomModal.Footer>
  </CustomModal>
);

const LeaveDetailsModal = ({ open, onClose, data }) => {
  const classes = useStyles();
  return (
    <CustomModal open={open} onClose={onClose}>
      <CustomModal.Header onClose={onClose}>Leave Details</CustomModal.Header>
      <Divider />
      <InformationDisplay data={data} />
      <Box sx={classes.modalFooter}>
        <CustomButton
          variant="outlined"
          onClick={onClose}
          colorScheme="bgWhite"
        >
          Close
        </CustomButton>
      </Box>
    </CustomModal>
  );
};

const InformationDisplay = ({ data }) => {
  const classes = useStyles();

  const handleFileDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    const filename = decodeURIComponent(url.split("/").pop().split("?")[0]);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFileName = (url) =>
    decodeURIComponent(url.split("/").pop().split("?")[0]);

  return (
    <Grid container spacing={2} py={2}>
      {data.map((item, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Typography sx={classes.label}>{item.label}</Typography>
          {item.label === "Status" ? (
            <Chip
              label={item.value}
              sx={{
                ...classes.valueChip,
                ...(item.value === STATUS.APPROVED
                  ? classes.chipApproved
                  : item.value === STATUS.PENDING
                  ? classes.chipPending
                  : classes.chipRejected),
              }}
            />
          ) : item.label === "Attachment" && item.value !== "-" ? (
            <Box
              sx={classes.attachmentBox}
              onClick={() => handleFileDownload(item.value)}
            >
              <img src={ICONS.FILE_DOC} alt="File Icon" />
              <Typography sx={classes.fileName}>
                {getFileName(item.value)}
              </Typography>
            </Box>
          ) : (
            <Typography sx={classes.value}>{item.value}</Typography>
          )}
          <Divider sx={{ mb: 2 }} />
        </Grid>
      ))}
    </Grid>
  );
};

const useStyles = () => ({
  label: {
    fontWeight: "fontWeightLight",
    fontSize: "fontSizeMediumSmall",
    color: "secondary.main",
    mb: 1,
  },
  value: {
    fontWeight: "fontWeightLight",
    fontSize: "fontSizeSmall",
    mb: 1.5,
  },
  valueChip: {
    fontWeight: "fontWeightLight",
    fontSize: "fontSizeSmall",
    mb: 0.5,
  },
  card: {
    p: 2,
    m: 2,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    gap: 2,
    "@media (min-width: 600px)": {
      flexDirection: "row",
    },
  },
  buttonGroup: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  tableContainer: {
    mt: 4,
  },
  employeeName: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  actionCell: {
    gap: 1,
  },
  chipApproved: {
    backgroundColor: COLORS.APPROVED.BACKGROUND,
    color: COLORS.APPROVED.TEXT,
    borderRadius: "4px",
  },
  chipPending: {
    backgroundColor: COLORS.PENDING.BACKGROUND,
    color: COLORS.PENDING.TEXT,
    borderRadius: "4px",
  },
  chipRejected: {
    backgroundColor: COLORS.REJECTED.BACKGROUND,
    color: COLORS.REJECTED.TEXT,
    borderRadius: "4px",
  },
  modalFooter: {
    display: "flex",
    justifyContent: "right",
    mt: 2,
    gap: 2,
  },
  iconButton: {
    padding: 1,
  },
  iconButtonDisabled: {
    pointerEvents: "none",
  },
  iconSvgDisabled: {
    color: "blue",
    filter: "grayscale(100%)",
    opacity: 0.5,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  attachmentBox: {
    borderRadius: "20px",
    bgcolor: COLORS.ATTACHMENT.BACKGROUND,
    padding: "4px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    mb: 0.4,
  },
  fileName: {
    marginLeft: "8px",
    flexGrow: 1,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});

export default LeavesList;

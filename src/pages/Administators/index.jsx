import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminAdd from "./AdminAdd";
import DateRangePicker from "../../components/Elements/DateRangePicker";
import AdminEdit from "../Administators/AdminEdit";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import {
  Card,
  IconButton,
  Avatar,
  CircularProgress,
  Box,
  Pagination,
  TextField,
  MenuItem,
} from "@mui/material";
import {
  CustomButton,
  TableComponent,
  SearchBar,
  CustomTypography,
  CustomModal,
} from "../../components/Elements";
import {
  fetchAllAdmins,
  fetchAdminDetail,
  deleteAdministrator,
} from "../../redux/slices/adminSlice";
import AddCircleSvg from "/assets/icons/add-circle.svg";
import { fetchCompanies } from "../../redux/slices/companySlice";
import adminConstants, {
  TABLE_COLUMNS,
  ICONS,
} from "../../constants/adminConstants";

const AdministratorsList = ({ userRole }) => {
  const companies = useSelector((state) => state.company.companies);
  const [searchValue, setSearchValue] = useState("");
  const [tableLoading, setTableLoading] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openDateFilter, setOpenDateFilter] = useState(false);
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });
  const [sortBy, setSortBy] = useState("");
  const [selectedData, setSelectedData] = useState({});
  const [transformData, setTransformData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 10,
  });
  const [page, setPage] = useState(paginationModel.page);
  const [pageSize, setPageSize] = useState(paginationModel.pageSize);
  const [applyDate, setApplyDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [error, setError] = useState(null);
  const [newAdminModal, setNewAdminModal] = useState(false);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  const handleSearchClick = () => {
    fetchTableData();
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePaginationChange = (newModel) => {
    setPaginationModel(newModel);
  };
  const classes = useStyles();
  const handleModalEditClose = () => {
    setOpenModalEdit(false);
    fetchTableData();
  };
  const handleCloseDate = () => setOpenDateFilter(false);

  const handleOpenModalAdd = () => setNewAdminModal(true);
  const handleCloseModalAdd = () => setNewAdminModal(false);

  const handleChangeRowsPerPage = (event) => {
    setPageSize(+event.target.value);
    setPage(1);
  };

  const fetchTableData = async () => {
    setTableLoading(true);
    setError(null);
    try {
      const responseData = await dispatch(
        fetchAllAdmins({
          sortBy,
          pageSize,
          page,
          startDateJoined: applyDate.startDate,
          endDateJoined: applyDate.endDate,
        })
      ).unwrap();
      console.log("responseData", responseData.data);
      setTransformData(
        responseData.data.map((admin) => ({
          id: admin.id_admin,
          company_name: admin.company.company_name,
          fullname: `${admin.first_name} ${admin.last_name}`,
          email: admin.email,
          username: admin.username,
          profile_picture: admin.profile_picture,
          created_date: admin.created_day
            ? dayjs(admin.created_day).format("YYYY-MM-DD")
            : "N/A",
        }))
      );
      setTotalData(responseData.meta.total || 0);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [
    dispatch,
    sortBy,
    page,
    pageSize,
    applyDate.startDate,
    applyDate.endDate,
  ]);

  useEffect(() => {
    try {
      dispatch(fetchCompanies()).then((response) => {
        console.log("companies", response);
      });
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    }
  }, []);

  const handleOpenModalEdit = (id) => {
    setOpenModalEdit(true);
    dispatch(fetchAdminDetail(id))
      .unwrap()
      .then((data) => {
        setSelectedData(data);
      })
      .catch((error) => {
        console.error("Failed to fetch admin details:", error);
      });
  };

  const handleClickDetail = (admin) => {
    navigate(`/administrators/${admin.username}`, {
      state: { idAdmin: admin?.id, adminName: admin?.username },
    });
  };

  const handleOpenDateFilter = () => {
    setOpenDateFilter(true);
  };

  const handleDateChange = (startDate, endDate) => {
    setDates({ startDate, endDate });
  };
  const handleDateApply = () => {
    if (dates.startDate == null && dates.endDate == null) {
      setApplyDate({
        startDate: dates.startDate
          ? dates.startDate.format("YYYY-MM-DD")
          : null,
        endDate: dates.endDate ? dates.endDate.format("YYYY-MM-DD") : null,
      });
    } else if (dates.startDate == null || dates.endDate == null) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Date Filter",
        text: "Both Start Date and End Date must be selected!",
        confirmButtonText: "OK",
      });
    } else {
      setApplyDate({
        startDate: dates.startDate
          ? dates.startDate.format("YYYY-MM-DD")
          : applyDate.startDate,
        endDate: dates.endDate
          ? dates.endDate.format("YYYY-MM-DD")
          : applyDate.endDate,
      });
    }
    setOpenDateFilter(false);
  };

  const handleDelete = async (id) => {
    const data = { is_delete: true };
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteAdministrator({ id, data })).unwrap().then();
        Swal.fire({
          title: "Success",
          text: "Delete Administrator Success",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            fetchTableData();
            setPage(1);
          }
        });
      } catch (error) {
        console.error("Error deleting admin:", error);
        Swal.fire(
          "Error",
          "There was an error deleting the administrator.",
          "error"
        );
      }
    }
  };
  const columns = TABLE_COLUMNS.map((column) => {
    if (column.field === "fullname") {
      return {
        ...column,
        renderCell: (params) => (
          <Box
            sx={{ display: "flex", alignItems: "center", paddingTop: "5px" }}
          >
            <Avatar sx={{ mr: 2 }} src={params.row.profile_picture} />
            <CustomTypography>{params.row.fullname}</CustomTypography>
          </Box>
        ),
      };
    }
    if (column.field === "action") {
      return {
        ...column,
        renderCell: (params) => (
          <Box sx={{ display: "flex", justifyContent: "stretch" }}>
            <IconButton
              aria-label="view"
              onClick={() => handleClickDetail(params.row)}
            >
              <img
                src={ICONS.VIEW}
                alt="Edit Icon"
                style={{ width: "20px", height: "20px" }}
              />
            </IconButton>
            <IconButton
              aria-label="edit"
              onClick={() => handleOpenModalEdit(params.row.id)}
            >
              <img
                src={ICONS.EDIT}
                alt="Edit Icon"
                style={{ width: "20px", height: "20px" }}
              />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete(params.row.id)}
            >
              <img
                src={ICONS.DELETE}
                alt="Edit Icon"
                style={{ width: "20px", height: "20px" }}
              />
            </IconButton>
          </Box>
        ),
      };
    }
    return column;
  });

  return (
    <Card variant="outlined" sx={{ p: 2, m: 2, mt: 4 }}>
      <Box
        direction="row"
        gap={1}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={classes.header}>
          <SearchBar
            searchValue={searchValue}
            onSearchChange={handleSearchChange}
            onSearchClick={handleSearchClick}
          />
        </Box>
        <Box sx={classes.actions}>
          <CustomButton
            colorScheme="bgWhite"
            icon={ICONS.CALENDAR}
            onClick={handleOpenDateFilter}
          >
            {adminConstants.dateFilter}
          </CustomButton>
          <CustomButton
            colorScheme="bgBlue"
            onClick={handleOpenModalAdd}
            icon={AddCircleSvg}
          >
            {adminConstants.addNewAdmin}
          </CustomButton>
        </Box>
      </Box>
      <Box sx={classes.tableContainer}>
        {tableLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <CustomTypography sx={{ textAlign: "center" }}>
            No Rows
          </CustomTypography>
        ) : (
          <TableComponent
            columns={columns}
            rows={transformData}
            searchValue={searchValue}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationChange}
            totalData={totalData || 0}
            rowCount={totalData || 0}
            paginationMode="server"
            loading={tableLoading}
            paginationEnabled={false}
          />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 3,
        }}
      >
        <TextField
          select
          value={pageSize}
          onChange={handleChangeRowsPerPage}
          sx={{ width: 100 }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </TextField>

        <Pagination
          count={Math.ceil(totalData / pageSize)}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </Box>
      <AdminEdit
        open={openModalEdit}
        handleClose={handleModalEditClose}
        adminDataProps={selectedData}
        companyData={companies}
        userRole={userRole}
        fetchData={fetchTableData}
        setPage={setPage}
      />
      <AdminAdd
        open={newAdminModal}
        onClose={handleCloseModalAdd}
        fetchData={fetchTableData}
        setPage={setPage}
      />
      <CustomModal open={openDateFilter} onClose={handleCloseDate}>
        <CustomModal.Header onClose={handleCloseDate}>
          {adminConstants.dateFilter}
        </CustomModal.Header>
        <DateRangePicker
          onDateChange={handleDateChange}
          startDate={dates.startDate}
          endDate={dates.endDate}
        />
        <CustomModal.Footer
          onClose={handleCloseDate}
          onSubmit={handleDateApply}
        >
          {adminConstants.applyButtonLabel}
        </CustomModal.Footer>
      </CustomModal>
    </Card>
  );
};

const useStyles = () => ({
  header: { display: "flex", justifyContent: "space-between" },
  actions: { display: "flex", alignItems: "center", gap: 2 },
  tableContainer: { mt: 2, width: "100%" },
});
export default AdministratorsList;

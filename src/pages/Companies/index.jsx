import {
  Box,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  CustomButton,
  CustomModal,
  CustomTypography,
  SearchBar,
  TableComponent,
} from "../../components/Elements";
import {
  deleteCompany,
  fetchDataCompanies,
} from "../../redux/slices/companySlice";
import theme from "../../styles/theme";
import { formatCreatedDate } from "../../utils/formatDate";
import AddOrEditCompany from "./AddOrEditCompany";
import DateRangePicker from "../../components/Elements/DateRangePicker";
import companyConstants, {
  TABLE_COLUMNS,
  ICONS,
} from "../../constants/companyConstants";

const CompaniesList = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.company);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [totalPage, setTotalPage] = useState(0);

  const [editCompanyModal, setEditCompanyModal] = useState(false);
  const [newCompanyModal, setNewCompanyModal] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [openDateFilter, setOpenDateFilter] = useState(false);
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });
  const [applyDate, setApplyDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 10,
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePaginationChange = (newModel) => {
    setPaginationModel(newModel);
  };

  const handleEditOpen = (id) => {
    setSelectedCompanyId(id);
    setEditCompanyModal(true);
  };
  const handleEditClose = () => setEditCompanyModal(false);

  const handleAddOpen = () => {
    setNewCompanyModal(true);
  };
  const handleAddClose = () => setNewCompanyModal(false);

  const navigate = useNavigate();

  const handleViewClick = (company) => {
    navigate(`/companies/${company?.companyName}`, {
      state: { idCompany: company?.id, companyName: company?.companyName },
    });
  };

  const fetchCompanies = useCallback(() => {
    dispatch(
      fetchDataCompanies({
        page: paginationModel.page,
        size: paginationModel.pageSize,
      })
    );
  }, [dispatch, paginationModel]);

  const handleDateChange = (startDate, endDate) => {
    setDates({ startDate, endDate });
    console.log(
      "Start Date:",
      startDate ? startDate.format("YYYY-MM-DD") : "Not set"
    );
    console.log(
      "End Date:",
      endDate ? endDate.format("YYYY-MM-DD") : "Not set"
    );
  };

  const handleOpenDateFilter = () => {
    setOpenDateFilter(true);
  };

  const handleDateApply = () => {
    if (dates.startDate == null && dates.endDate == null) {
      fetchCompanies();
    } else if (dates.startDate == null || dates.endDate == null) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Date Filter",
        text: "Both Start Date and End Date must be selected!",
        confirmButtonText: "OK",
      });
    } else {
      dispatch(
        fetchDataCompanies({
          sortBy,
          pageSize,
          pageNumber: page,
          startDateJoined: dates.startDate
            ? dates.startDate.format("YYYY-MM-DD")
            : null,
          endDateJoined: dates.endDate
            ? dates.endDate.format("YYYY-MM-DD")
            : null,
        })
      );
    }
    setOpenDateFilter(false);
  };

  const handleCloseDate = () => setOpenDateFilter(false);

  const handleDeleteCompany = async (id_company) => {
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
        const data = { is_delete: true };
        await dispatch(deleteCompany({ id: id_company, data }));
        await dispatch(deleteCompany({ id: id_company, data }));

        Swal.fire({
          title: "Success",
          text: "Delete Company Success",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } catch (error) {
        Swal.fire("Error", "There was an error deleting the company.", "error");
      }
    }
  };

  const columns = TABLE_COLUMNS.map((column) => {
    if (column.field === "companyName") {
      return {
        ...column,
        renderCell: (params) => (
          <Box
            sx={{ display: "flex", alignItems: "center", paddingTop: "5px" }}
          >
            <CustomTypography>{params.row.companyName}</CustomTypography>
          </Box>
        ),
      };
    }
    if (column.field === "actions") {
      return {
        ...column,
        renderCell: (params) => (
          <Box sx={{ display: "flex", justifyContent: "stretch" }}>
            <IconButton
              aria-label="view"
              onClick={() => handleViewClick(params.row)}
            >
              <img
                src={ICONS.VIEW}
                alt="View Icon"
                style={{ width: "20px", height: "20px" }}
              />
            </IconButton>
            <IconButton
              aria-label="edit"
              onClick={() => handleEditOpen(params.row.id)}
            >
              <img
                src={ICONS.EDIT}
                alt="Edit Icon"
                style={{ width: "20px", height: "20px" }}
              />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => handleDeleteCompany(params.row.id)}
            >
              <img
                src={ICONS.DELETE}
                alt="Delete Icon"
                style={{ width: "20px", height: "20px" }}
              />
            </IconButton>
          </Box>
        ),
      };
    }
    return column;
  });

  useEffect(() => {
    const params = {
      sortBy: sortBy,
      pageSize: pageSize,
      pageNumber: page,
      startDateJoined: applyDate.startDate || undefined,
      endDateJoined: applyDate.endDate || undefined,
    };
    dispatch(fetchDataCompanies(params));
  }, [
    dispatch,
    sortBy,
    pageSize,
    page,
    applyDate.startDate,
    applyDate.endDate,
  ]);

  useEffect(() => {
    if (data) {
      setTotalPage(data?.meta?.total);
    }
  }, [data]);

  const transformedData = Array.isArray(data?.data)
    ? data.data.map((company) => ({
        id: company.id_company || "N/A",
        companyName: String(company.company_name || "Unknown"),
        email: String(company.email || "No email"),
        totalAdmin: company.total_admin ?? 0,
        phone: String(company.phone || "No phone"),
        joiningDate: company.joining_date
          ? formatCreatedDate(company.joining_date)
          : "N/A",
      }))
    : [];

  if (status) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid
      border={`1px solid ${theme.palette.grey[300]}`}
      borderRadius={"5px"}
      sx={{ m: 2 }}
    >
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          {/* Filter and Search */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <SearchBar
              searchValue={searchQuery}
              onSearchChange={handleSearchChange}
            />
          </Box>
          <Stack direction="row" spacing={2}>
            <CustomButton
              icon={ICONS.CALENDAR}
              colorScheme="bgWhite"
              onClick={handleOpenDateFilter}
            >
              {companyConstants.dateFilter}
            </CustomButton>

            <CustomButton
              colorScheme="bgBlue"
              icon={ICONS.ADD_CIRCLE}
              onClick={handleAddOpen} // Untuk membuka modal Add
            >
              {companyConstants.addNewCompany}
            </CustomButton>
          </Stack>
        </Box>
        {transformedData.length === 0 ? (
          <Typography sx={{ textAlign: "center" }}>No Rows</Typography>
        ) : (
          <TableComponent
            columns={columns}
            rows={transformedData}
            searchValue={searchQuery}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationChange}
            totalData={data?.meta?.total || 0}
            rowCount={data?.meta?.total || 0}
            paginationMode="server"
            paginationEnabled={false}
          />
        )}
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
            onChange={(e) => setPageSize(parseInt(e.target.value, 10))}
            sx={{ width: 100 }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </TextField>

          <Pagination
            count={Math.ceil(totalPage / pageSize)}
            page={page}
            onChange={(e, value) => setPage(value)}
          />
        </Box>
      </Box>

      {/* Modal untuk Add dan Edit */}
      <AddOrEditCompany
        open={newCompanyModal}
        handleClose={handleAddClose}
        isEditMode={false} // Untuk Add, mode edit false
      />
      <AddOrEditCompany
        open={editCompanyModal}
        handleClose={handleEditClose}
        companyId={selectedCompanyId}
        isEditMode={true} // Untuk Edit, mode edit true
      />

      <CustomModal open={openDateFilter} onClose={handleCloseDate}>
        <CustomModal.Header onClose={handleCloseDate}>
          {companyConstants.dateFilter}
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
          {companyConstants.applyButtonLabel}
        </CustomModal.Footer>
      </CustomModal>
    </Grid>
  );
};

export default CompaniesList;

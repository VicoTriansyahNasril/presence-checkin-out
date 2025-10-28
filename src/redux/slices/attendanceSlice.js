import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAttendances,
  importAttendanceAPI,
} from "../../services/apis/attendanceService";

import {
  fetchAttendancesPending,
  fetchAttendancesFulfilled,
  fetchAttendancesRejected,
  importAttendancesPending,
  importAttendancesFulfilled,
  importAttendancesRejected,
} from "../reducers/attendanceReducer";

export const fetchAttendances = createAsyncThunk(
  "attendances/fetchAll",
  async ({ page, size, keyword }, { rejectWithValue }) => {
    try {
      const response = await getAttendances(page, size, keyword);
      return {
        attendances: response.data,
        totalData: response.total_data,
        totalPage: response.total_page,
        pageSize: response.page_size,
      };
    } catch (error) {
      console.error("Error fetching attendance:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const importAttendance = createAsyncThunk(
  "attendances/importAttendance",
  async (file, { rejectWithValue }) => {
    try {
      const response = await importAttendanceAPI(file);
      console.log("slice import", response);
      return response;
    } catch (error) {
      console.error("Error importing attendace:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendances",
  initialState: {
    data: [],
    loading: false,
    error: null,
    totalPage: 0,
    totalData: 0,
    pageSize: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendances.pending, fetchAttendancesPending)
      .addCase(fetchAttendances.fulfilled, fetchAttendancesFulfilled)
      .addCase(fetchAttendances.rejected, fetchAttendancesRejected)
      .addCase(importAttendance.pending, importAttendancesPending)
      .addCase(importAttendance.fulfilled, importAttendancesFulfilled)
      .addCase(importAttendance.rejected, importAttendancesRejected);
  },
});

export default attendanceSlice.reducer;

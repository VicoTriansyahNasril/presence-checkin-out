import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getLeaves,
  changeStatusLeave,
  getLeaveDetails,
} from "../../services/apis/leaveService";
import {
  fetchLeavesPending,
  fetchLeavesFulfilled,
  fetchLeavesRejected,
  updateLeavesPending,
  updateLeavesFulfilled,
  updateLeavesRejected,
  fetchLeavesDetailPending,
  fetchLeavesDetailFulfilled,
  fetchLeavesDetailRejected,
} from "../reducers/leaveReducer";

// Async thunk for fetching all leaves
export const fetchAllLeaves = createAsyncThunk(
  "leaves/fetchAll",
  async ({ page, size, keyword, startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await getLeaves(page, size, keyword, startDate, endDate);
      return {
        leaves: response.data,
        totalData: response.totalData,
        totalPage: response.totalPage,
        pageSize: response.pageSize,
      };
    } catch (error) {
      let errorMessage = "Unknown error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for fetching leave details
export const fetchLeaveDetail = createAsyncThunk(
  "leaves/fetchLeaveDetail",
  async (idLeave, { rejectWithValue }) => {
    try {
      const response = await getLeaveDetails(idLeave);
      return response.data;
    } catch (error) {
      let errorMessage = "Unknown error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for updating leave status
export const updateLeaveStatus = createAsyncThunk(
  "leaves/updateLeaveStatus",
  async ({ idLeave, status }, { rejectWithValue }) => {
    try {
      const response = await changeStatusLeave(idLeave, status);
      return response.data;
    } catch (error) {
      let errorMessage = "Unknown error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

const leaveSlice = createSlice({
  name: "leaves",
  initialState: {
    data: [],
    dataDetail: [],
    loading: false,
    error: null,
    totalData: 0,
    totalPage: 0,
    pageSize: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all leaves
      .addCase(fetchAllLeaves.pending, fetchLeavesPending)
      .addCase(fetchAllLeaves.fulfilled, fetchLeavesFulfilled)
      .addCase(fetchAllLeaves.rejected, fetchLeavesRejected)
      // Fetch leave details
      .addCase(fetchLeaveDetail.pending, fetchLeavesDetailPending)
      .addCase(fetchLeaveDetail.fulfilled, fetchLeavesDetailFulfilled)
      .addCase(fetchLeaveDetail.rejected, fetchLeavesDetailRejected)
      // Update leave status
      .addCase(updateLeaveStatus.pending, updateLeavesPending)
      .addCase(updateLeaveStatus.fulfilled, updateLeavesFulfilled)
      .addCase(updateLeaveStatus.rejected, updateLeavesRejected);
  },
});

export default leaveSlice.reducer;

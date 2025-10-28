import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSuperadminInformation } from "../../services/apis/superadminService";
import {
  fetchSuperadminFulfilled,
  fetchSuperadminPending,
  fetchSuperadminRejected,
} from "../reducers/superadminReducer";

export const fetchSuperadmin = createAsyncThunk(
  "superadmin/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSuperadminInformation();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
const superadminSlice = createSlice({
  name: "superadmin",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuperadmin.pending, fetchSuperadminPending)
      .addCase(fetchSuperadmin.fulfilled, fetchSuperadminFulfilled)
      .addCase(fetchSuperadmin.rejected, fetchSuperadminRejected);
  },
});

export default superadminSlice.reducer;

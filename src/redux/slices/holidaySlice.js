import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCompanyConfig } from "../../services/apis/companyService";
import {
  createHolidayAPI,
  fetchHolidaysAPI,
} from "../../services/apis/holidayService";
import {
  createHolidayFulfilled,
  createHolidayPending,
  createHolidayRejected,
  fetchCompanyConfigFulfilled,
  fetchCompanyConfigPending,
  fetchCompanyConfigRejected,
  fetchHolidaysFulfilled,
  fetchHolidaysPending,
  fetchHolidaysRejected,
} from "../reducers/holidayReducer";

export const fetchCompanyConfig = createAsyncThunk(
  "holidays/fetchCompanyConfig",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCompanyConfig();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchHolidays = createAsyncThunk(
  "holidays/fetchHolidays",
  async ({ year, page, size }, { rejectWithValue }) => {
    try {
      const response = await fetchHolidaysAPI(year, page, size);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createHoliday = createAsyncThunk(
  "holidays/createHoliday",
  async (holidayData, { rejectWithValue }) => {
    try {
      const response = await createHolidayAPI(holidayData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const holidaySlice = createSlice({
  name: "holidays",
  initialState: {
    holidays: [],
    loading: false,
    error: null,
    totalElements: 0,
    companyConfig: null,
    defaultHolidayEnabled: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHolidays.pending, fetchHolidaysPending)
      .addCase(fetchHolidays.fulfilled, fetchHolidaysFulfilled)
      .addCase(fetchHolidays.rejected, fetchHolidaysRejected)
      .addCase(createHoliday.pending, createHolidayPending)
      .addCase(createHoliday.fulfilled, createHolidayFulfilled)
      .addCase(createHoliday.rejected, createHolidayRejected)
      .addCase(fetchCompanyConfig.pending, fetchCompanyConfigPending)
      .addCase(fetchCompanyConfig.fulfilled, fetchCompanyConfigFulfilled)
      .addCase(fetchCompanyConfig.rejected, fetchCompanyConfigRejected);
  },
});

export default holidaySlice.reducer;

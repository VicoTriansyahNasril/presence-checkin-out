const transformAttendanceData = (attendances) =>
  attendances.map((attendance) => ({
    ...attendance,
    employee_name: `${attendance.first_name} ${attendance.last_name}`, // Combining first and last name
    id: `${attendance.first_name}_${attendance.last_name}_${attendance.date_attendance}`, // Unique ID
  }));

export const fetchAttendancesPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchAttendancesFulfilled = (state, action) => {
  state.loading = false;

  // Transform and update attendances data
  state.data = transformAttendanceData(action.payload.attendances);

  state.totalData = action.payload.totalData;
  state.totalPage = action.payload.totalPage;
  state.pageSize = action.payload.pageSize;
};

export const fetchAttendancesRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const importAttendancesPending = (state) => {
  state.error = null;
};

export const importAttendancesFulfilled = (state, action) => {
  state.loading = false;
  state.data = action.payload.data;
};

export const importAttendancesRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

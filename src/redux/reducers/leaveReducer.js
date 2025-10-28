export const fetchLeavesPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchLeavesFulfilled = (state, action) => {
  const transformedResponse = action.payload.leaves.map((leave) => ({
    id_leave: leave.id_leave,
    leaveType: leave.leave_type,
    leaveDuration: `${new Date(leave.start_date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
    })} - ${new Date(leave.end_date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
    })}, ${new Date(leave.start_date).getFullYear()}`,
    status: leave.status,
    employeeName: `${leave.first_name} ${leave.last_name}`,
    department: leave.department_name || "N/A",
    profilePicture: leave.profile_picture,
  }));

  state.data = transformedResponse;
  state.loading = false;
  state.totalData = action.payload.totalData;
  state.totalPage = action.payload.totalPage;
  state.pageSize = action.payload.pageSize;
};

export const fetchLeavesRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const fetchLeavesDetailPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchLeavesDetailFulfilled = (state, action) => {
  const transformedDetail = [
    {
      label: "Created At",
      value: action.payload.created_date
        ? new Date(action.payload.created_date).toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          })
        : "-",
    },
    {
      label: "Leave Duration",
      value: `${
        action.payload.start_date
          ? new Date(action.payload.start_date).toLocaleDateString("en-US", {
              month: "long",
              day: "2-digit",
            })
          : "-"
      } - ${
        action.payload.end_date
          ? new Date(action.payload.end_date).toLocaleDateString("en-US", {
              month: "long",
              day: "2-digit",
            })
          : "-"
      }, ${
        action.payload.start_date
          ? new Date(action.payload.start_date).getFullYear()
          : "-"
      }`,
    },
    {
      label: "Employee Number",
      value: action.payload.employeeNumber || "-",
    },
    {
      label: "Status",
      value: action.payload.status || "-",
    },
    {
      label: "Employee Name",
      value:
        action.payload.first_name && action.payload.last_name
          ? `${action.payload.first_name} ${action.payload.last_name}`
          : "-",
    },
    {
      label: "Reason",
      value: action.payload.reason || "-",
    },
    {
      label: "Department",
      value: action.payload.department_name || "-",
    },
    {
      label: "Attachment",
      value: action.payload.attachment || "-",
    },
    {
      label: "Leave Type",
      value: action.payload.leave_type || "-",
    },
  ];

  state.dataDetail = transformedDetail;
  state.loading = false;
};

export const fetchLeavesDetailRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const updateLeavesFulfilled = (state, action) => {
  state.loading = false;
  state.data = action.payload;
};

export const updateLeavesRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const updateLeavesPending = (state) => {
  state.loading = true;
  state.error = null;
};

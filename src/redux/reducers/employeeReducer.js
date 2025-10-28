export const fetchEmployeesPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchEmployeesFulfilled = (state, action) => {
  state.loading = false;
  state.data = action.payload.employees;
  state.totalData = action.payload.totalData;
  state.totalPage = action.payload.totalPage;
  state.pageSize = action.payload.pageSize;
};

export const fetchEmployeesRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const addEmployeePending = (state) => {
  state.loading = true;
  state.error = null;
};

export const addEmployeeFulfilled = (state, action) => {
  state.loading = false;
  const employee = action.payload;

  const {
    role_current_company,
    id_employee,
    id_department,
    id_company,
    employee_number,
    first_name,
    last_name,
    status,
    id_account,
    ...rest
  } = employee;

  const transformedEmployee = {
    ...rest,
    company: {
      ...rest.company,
      idCompany: id_company,
    },
    department: {
      ...rest.department,
      idDepartment: id_department,
    },
    idEmployee: id_employee,
    employeeName: `${first_name} ${last_name}`,
    employeeNumber: employee_number,
    roleCurrentCompany: role_current_company,
    status: status, 
  };

  if (transformedEmployee.idEmployee) {
    state.data.push(transformedEmployee);
    state.pageSize = (state.pageSize || 0) + 1;
  } else {
    console.error("Error: Employee ID is undefined", transformedEmployee);
  }
};

export const addEmployeeRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const importEmployeePending = (state) => {
  state.error = null;
};

export const importEmployeeFulfilled = (state, action) => {
  state.loading = false;
  state.data = action.payload.data;
};

export const importEmployeeRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const fetchEmployeeProfileByUsernamePending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchEmployeeProfileByUsernameFulfilled = (state, action) => {
  state.loading = false;
  state.selectedEmployee = action.payload;
};

export const fetchEmployeeProfileByUsernameRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const fetchEmployeeProfessionalInfoPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchEmployeeProfessionalInfoFulfilled = (state, action) => {
  state.loading = false;
  state.professionalInfo = action.payload.data;
};

export const fetchEmployeeProfessionalInfoRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const fetchEmployeePersonalInfoPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchEmployeePersonalInfoFulfilled = (state, action) => {
  state.loading = false;
  state.personalInfo = action.payload.data;
};

export const fetchEmployeePersonalInfoRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const fetchEmployeeLeavePending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchEmployeeLeaveFulfilled = (state, action) => {
  state.loading = false;
  const transformedLeaves = action.payload.map((leave) => ({
    ...leave,
    date: leave.created_date
      ? new Date(leave.created_date).toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })
      : "-",
    leave_duration: `${
      leave.start_date
        ? new Date(leave.start_date).toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
          })
        : "-"
    } - ${
      leave.end_date
        ? new Date(leave.end_date).toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
          })
        : "-"
    }, ${leave.start_date ? new Date(leave.start_date).getFullYear() : "-"}`,
    leave_days:
      Math.ceil(
        (new Date(leave.end_date) - new Date(leave.start_date) + 86400000) /
          (1000 * 60 * 60 * 24)
      ) + " Days",
  }));

  state.leaves = transformedLeaves;
};

export const fetchEmployeeLeaveRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const editPersonalEmployeePending = (state) => {
  state.loading = true;
  state.error = null;
};

export const editPersonalEmployeeFulfilled = (state, action) => {
  state.loading = false;
};

export const editPersonalEmployeeRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const editProfessionalEmployeePending = (state) => {
  state.loading = true;
  state.error = null;
};

export const editProfessionalEmployeeFulfilled = (state, action) => {
  state.loading = false;
};

export const editProfessionalEmployeeRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const deleteEmployeePending = (state) => {
  state.loading = true;
  state.error = null;
};

export const deleteEmployeeFulfilled = (state, action) => {
  state.loading = false;

  const deletedEmployee = action.payload;
  state.data = state.data.filter(
    (employee) => employee.idEmployee !== deletedEmployee.id_employee
  );
};

export const deleteEmployeeRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const editPasswordPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const editPasswordFulfilled = (state) => {
  state.loading = false;
};

export const editPasswordRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const fetchEmployeeAttendanceDetailsByIdPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchEmployeeAttendanceDetailsByIdFulfilled = (state, action) => {
  state.loading = false;
  state.attendanceDetails = action.payload.map((attendance) => {
    const checkIn = new Date(attendance.check_in).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const checkOut = attendance.check_out
      ? new Date(attendance.check_out).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : "-";

    const totalWorkingHours = attendance.total_working_hours
      ? `${attendance.total_working_hours.substring(0, 5)} Hrs`
      : "-";

    return {
      id: attendance.id_attendance,
      date: new Date(attendance.date_attendance).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      checkIn,
      checkOut,
      workingHours: totalWorkingHours,
      status: attendance.status,
    };
  });
};

export const fetchEmployeeAttendanceDetailsByIdRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

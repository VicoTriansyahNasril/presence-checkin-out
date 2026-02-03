import { mockEmployees, mockAttendance, mockCompanies, mockUsers, simulateDelay } from "../../data/mockData";
import dayjs from "dayjs";

export const getTopEmployees = async () => {
  await simulateDelay();

  // Ambil data mockEmployees 5 teratas
  const topEmp = mockEmployees.slice(0, 5).map(emp => {
    // Cari absensi hari ini (gunakan dayjs agar format konsisten)
    const today = dayjs().format("YYYY-MM-DD");
    const att = mockAttendance.find(a =>
      a.employee_name === emp.employeeName &&
      a.date_attendance === today
    );

    return {
      idEmployee: emp.idEmployee,
      employeeName: emp.employeeName,
      // Pastikan struktur department sesuai dengan yang diharapkan UI (nested object)
      department: { departmentName: emp.department?.departmentName || "N/A" },
      profilePicture: emp.profilePicture,
      status: att ? att.status : "Absent",
      checkIn: att ? att.check_in : null,
      totalWorkingHours: att ? att.total_working_hours : "N/A"
    };
  });

  return { statusCode: 200, data: topEmp };
};

export const getDashboardSummary = async () => {
  await simulateDelay();

  const totalEmployee = mockEmployees.length;

  // Gunakan dayjs untuk mendapatkan tanggal hari ini yang konsisten dengan mockData
  const today = dayjs().format("YYYY-MM-DD");
  const todayAttendance = mockAttendance.filter(a => a.date_attendance === today).length;

  // Hardcode data statistik agar grafik terlihat bagus untuk demo
  return {
    statusCode: 200,
    data: {
      total_employee: totalEmployee,
      today_attendance: todayAttendance > 0 ? todayAttendance : 15, // Fallback agar tidak 0
      total_leave: { today: 2, this_week: 5, this_month: 12 },
      total_on_time: { today: 12, this_week: 45, this_month: 120 },
      total_late: { today: 3, this_week: 8, this_month: 20 },
      total_absence: { today: 1, this_week: 2, this_month: 5 }
    }
  };
};

export const getAttendanceOverview = async () => {
  await simulateDelay();

  // Data dummy statis untuk grafik agar selalu muncul
  const mockChartData = [
    { time_period: "Mon", on_time: 25, late: 2, leave: 1, absent: 0 },
    { time_period: "Tue", on_time: 28, late: 1, leave: 0, absent: 1 },
    { time_period: "Wed", on_time: 26, late: 3, leave: 1, absent: 0 },
    { time_period: "Thu", on_time: 29, late: 0, leave: 2, absent: 0 },
    { time_period: "Fri", on_time: 24, late: 5, leave: 1, absent: 0 },
  ];

  return {
    statusCode: 200,
    data: {
      // Isi untuk semua filter agar dropdown bekerja
      this_week: { attendance_overview: mockChartData },
      this_month: { attendance_overview: mockChartData },
      today: {
        department_attendance_overview: [
          { department_name: "Engineering", on_time: 12, late: 1, leave: 1, absent: 0 },
          { department_name: "HR", on_time: 5, late: 0, leave: 0, absent: 0 },
          { department_name: "Marketing", on_time: 7, late: 1, leave: 0, absent: 0 },
          { department_name: "Finance", on_time: 6, late: 0, leave: 0, absent: 0 },
          { department_name: "Ops", on_time: 10, late: 2, leave: 1, absent: 1 }
        ]
      }
    }
  };
};

// Superadmin Dashboard
export const getDataDashboardSuperadmin = async () => {
  await simulateDelay();
  const today = new Date().toISOString();
  return {
    statusCode: 200,
    data: {
      company: { total_company: mockCompanies.length, last_update: today },
      admin: { total_admin: mockUsers.filter(u => u.role === 'Admin').length, last_update: today },
      employee: { total_employee: mockEmployees.length, last_update: today }
    }
  };
};

export const getDataChartSuperadmin = async (startDate, endDate) => {
  await simulateDelay();
  return {
    statusCode: 200,
    data: [
      { company_name: "Tech Solutions", percentage: 85 },
      { company_name: "Creative Studio", percentage: 70 },
      { company_name: "Global Corp", percentage: 60 },
      { company_name: "StartUp Inc", percentage: 90 },
      { company_name: "Alpha Ltd", percentage: 50 }
    ]
  };
};
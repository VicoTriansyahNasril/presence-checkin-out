import dayjs from "dayjs";

// Helper untuk random number
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// --- MOCK USERS (AUTH) ---
export const mockUsers = [
    {
        id_admin: 1,
        id_account: 1,
        id_company: 1,
        username: "admin_user",
        password: "admin123",
        role: "Admin",
        name: "Admin Demo",
        first_name: "Admin",
        last_name: "Demo",
        email: "admin@demo.com",
        profile_picture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
        created_day: "2023-01-15",
    },
    {
        id_admin: 99,
        id_account: 99,
        id_company: null,
        username: "super_admin",
        password: "superadmin123",
        role: "Superadmin",
        name: "Super Admin",
        first_name: "Super",
        last_name: "Admin",
        email: "super@admin.com",
        profile_picture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
        created_day: "2022-01-01",
    },
];

// --- MOCK COMPANIES ---
export const mockCompanies = [
    {
        id_company: 1,
        company_name: "Tech Solutions Inc.",
        founder: "John Doe",
        email: "contact@techsolutions.com",
        phone: "08123456789",
        address: "Jl. Sudirman No. 1",
        province: "DKI Jakarta",
        city: "Jakarta Selatan",
        district: "Kebayoran Baru",
        zip_code: "12190",
        latitude: -6.2297465,
        longitude: 106.829518,
        joining_date: "2023-01-01",
        founded_at: "2010-05-20",
        total_admin: 3,
        company_logo: "https://ui-avatars.com/api/?name=Tech+Solutions&background=0D8ABC&color=fff&size=150",
    },
];

// --- MOCK COMPANY CONFIG ---
export let mockCompanyConfig = {
    working_day_start: "Monday",
    working_day_end: "Friday",
    working_hours_start: "09:00:00",
    working_hours_end: "18:00:00",
    working_duration: 540,
    working_day_flexible: false,
    working_hours_flexible: false,
    working_duration_flexible: false,
    check_in_tolerance: 15,
    check_in_tolerance_flexible: false,
    check_out_tolerance: 15,
    check_out_tolerance_flexible: false,
    auto_check_out_time: "23:59:00",
    selfie_mode: true,
    break_time: 60,
    break_time_flexible: true,
    after_break_tolerance: 10,
    after_break_tolerance_flexible: false,
    geolocation: true,
    geolocation_radius: 100,
    flexible_geolocation_mode: false,
    terms_conditions: "<p>Standard terms and conditions apply for employees.</p>",
    default_holiday: true,
};

// --- MOCK DEPARTMENTS ---
export const mockDepartments = [
    { id: 1, name: "Engineering", totalEmployees: 0, topEmployees: [] },
    { id: 2, name: "Human Resources", totalEmployees: 0, topEmployees: [] },
    { id: 3, name: "Marketing", totalEmployees: 0, topEmployees: [] },
    { id: 4, name: "Finance", totalEmployees: 0, topEmployees: [] },
    { id: 5, name: "Operations", totalEmployees: 0, topEmployees: [] },
];

// --- MOCK EMPLOYEES (GENERATOR) ---
const firstNames = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Heidi", "Ivan", "Judy", "Kevin", "Laura", "Michael", "Nina", "Oscar", "Pam", "Quinn", "Rachel", "Steve", "Tina"];
const lastNames = ["Johnson", "Smith", "Brown", "Williams", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];
const roles = ["Staff", "Senior Staff", "Manager", "Lead", "Intern"];
const statuses = ["Permanent", "Contract", "Probation"];

export let mockEmployees = Array.from({ length: 50 }, (_, i) => {
    const deptId = (i % 5) + 1;
    const dept = mockDepartments.find(d => d.id === deptId);
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];

    // Format username: alicejohnson0 (tanpa underscore, agar sesuai URL)
    const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${i}`;

    return {
        idEmployee: 100 + i,
        id_employee: 100 + i,
        employeeName: `${firstName} ${lastName}`,
        first_name: firstName,
        last_name: lastName,
        username: username,
        employeeNumber: `EMP${(1000 + i).toString()}`,
        employee_number: `EMP${(1000 + i).toString()}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@techsolutions.com`,
        status: statuses[i % statuses.length],
        roleCurrentCompany: roles[i % roles.length],
        role_current_company: roles[i % roles.length],
        role_in_client: "N/A",
        joining_date: dayjs().subtract(randomInt(1, 36), 'month').format("YYYY-MM-DD"),
        profilePicture: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
        profile_picture: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
        department: { id: deptId, departmentName: dept.name },
        id_department: deptId,
        mobile_number: `0812${randomInt(10000000, 99999999)}`,
        gender: i % 2 === 0 ? "Female" : "Male",
        marital_status: i % 3 === 0 ? "Married" : "Single",
        nationality: "Indonesia",
        address: `Jl. Dummy No ${i + 1}`,
        province: "DKI Jakarta",
        city: "Jakarta Selatan",
        district: "Kebayoran",
        zip_code: "12000",
        date_of_birth: dayjs().subtract(randomInt(20, 40), 'year').format("YYYY-MM-DD"),
    };
});

// Update departments with employee counts
mockDepartments.forEach(dept => {
    const employeesInDept = mockEmployees.filter(e => e.id_department === dept.id);
    dept.totalEmployees = employeesInDept.length;
    dept.topEmployees = employeesInDept.slice(0, 3).map(e => ({
        name: e.employeeName,
        position: e.roleCurrentCompany,
        profilePicture: e.profilePicture,
        username: e.username
    }));
});

// --- MOCK ATTENDANCE (GENERATOR) ---
export const mockAttendance = [];
const attendanceStatuses = ["On Time", "Late", "On Time", "On Time", "Late"];

for (let d = 0; d < 7; d++) {
    const date = dayjs().subtract(d, 'day').format("YYYY-MM-DD");

    mockEmployees.forEach((emp, index) => {
        if (Math.random() > 0.9) return;

        const status = attendanceStatuses[randomInt(0, 4)];
        const checkInHour = status === "Late" ? 9 : 8;
        const checkInMinute = randomInt(0, 59);

        mockAttendance.push({
            id_attendance: parseInt(`${d}${index}`),
            date_attendance: date,
            department_name: emp.department.departmentName,
            first_name: emp.first_name,
            last_name: emp.last_name,
            employee_name: emp.employeeName,
            profile_picture: emp.profilePicture,
            status: status,
            check_in: dayjs(date).hour(checkInHour).minute(checkInMinute).format(),
            check_out: dayjs(date).hour(17).minute(randomInt(0, 59)).format(),
            total_working_hours: "09:00:00",
        });
    });
}

// --- MOCK LEAVES ---
export const mockLeaves = [
    {
        id_leave: 1,
        leave_type: "Annual Leave",
        start_date: dayjs().add(2, 'day').format("YYYY-MM-DD"),
        end_date: dayjs().add(4, 'day').format("YYYY-MM-DD"),
        status: "Pending",
        first_name: mockEmployees[0].first_name,
        last_name: mockEmployees[0].last_name,
        department_name: mockEmployees[0].department.departmentName,
        profile_picture: mockEmployees[0].profilePicture,
        reason: "Family vacation",
        attachment: "ticket.pdf",
        created_date: dayjs().format("YYYY-MM-DD"),
        employeeNumber: mockEmployees[0].employeeNumber,
    },
    {
        id_leave: 2,
        leave_type: "Sick Leave",
        start_date: dayjs().subtract(2, 'day').format("YYYY-MM-DD"),
        end_date: dayjs().subtract(1, 'day').format("YYYY-MM-DD"),
        status: "Approved",
        first_name: mockEmployees[1].first_name,
        last_name: mockEmployees[1].last_name,
        department_name: mockEmployees[1].department.departmentName,
        profile_picture: mockEmployees[1].profilePicture,
        reason: "Flu",
        attachment: "medical.pdf",
        created_date: dayjs().subtract(3, 'day').format("YYYY-MM-DD"),
        employeeNumber: mockEmployees[1].employeeNumber,
    },
];

// --- MOCK HOLIDAYS ---
export const mockHolidays = [
    { id_holiday: 1, holiday_name: "New Year's Day", date: `${dayjs().year()}-01-01` },
    { id_holiday: 2, holiday_name: "Labor Day", date: `${dayjs().year()}-05-01` },
    { id_holiday: 3, holiday_name: "Independence Day", date: `${dayjs().year()}-08-17` },
];

export const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));
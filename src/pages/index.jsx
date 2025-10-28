import React, { useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdmin } from "../redux/slices/adminSlice"; // Import action untuk fetch admin data
import { Box } from "@mui/material";
import CustomLoader from "../components/Elements/CustomLoader"; // CustomLoader untuk fallback

// Lazy loading untuk komponen
const Administrators = lazy(() => import("./Administators"));
const AdminProfile = lazy(() => import("./Administators/AdminProfile"));
const Attendances = lazy(() => import("./Attendances"));
const Auth = lazy(() => import("./Auth"));
const Companies = lazy(() => import("./Companies"));
const CompanyProfile = lazy(() => import("./Companies/CompanyDetail"));
const Dashboard = lazy(() => import("./Dashboard"));
const Departments = lazy(() => import("./Departments"));
const DepartmentDetails = lazy(() => import("./Departments/DepartmentDetails"));
const Employees = lazy(() => import("./Employees"));
const EmployeeDetails = lazy(() => import("./Employees/EmployeeDetail"));
const Holidays = lazy(() => import("./Holidays"));
const Leaves = lazy(() => import("./Leaves"));
const Settings = lazy(() => import("./Settings"));
const DashboardSuperadmin = lazy(() =>
  import("./Dashboard/DashboardSuperadmin")
);
const PrivateRoute = lazy(() => import("./PrivateRoute"));
const AdminSidebar = lazy(() =>
  import("../components/Navigation/AdminSidebar")
);
const SuperadminSidebar = lazy(() =>
  import("../components/Navigation/SuperadminSidebar")
);
const Header = lazy(() => import("../components/Header")); // Menggunakan Header yang sama untuk Admin & Superadmin

const CompaniesList = lazy(() => import("./Companies"));

const Pages = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const [userRole, setUserRole] = React.useState("");
  const [adminId, setAdminId] = React.useState("");
  const [storedUser, setStoredUser] = React.useState();
  const location = useLocation();
  const dispatch = useDispatch();

  const adminData = useSelector((state) => state.admin.data);
  const isPublicRoute = location.pathname === "/login";

  // Fetch admin or superadmin data based on role
  useEffect(() => {
    setStoredUser(JSON.parse(localStorage.getItem("user")));
    setAdminId(storedUser?.id_admin);
    setUserRole(storedUser?.role);

    if (isAuthenticated && adminId) {
      if (userRole === "Admin") {
        dispatch(fetchAdmin(adminId));
      } else if (userRole === "Superadmin") {
        // Logic for fetching superadmin (you will implement fetchSuperAdmin)
        // dispatch(fetchSuperAdmin());
      }
    }
  }, [dispatch, isAuthenticated, userRole]);

  // Jika masih dalam proses loading, tampilkan spinner
  if (loading || (!adminData && user?.role === "Admin")) {
    return <CustomLoader loading={loading} />;
  }

  // Redirect ke dashboard jika pengguna sudah login dan mencoba mengakses halaman login
  if (isAuthenticated && isPublicRoute) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box sx={{ padding: "16px" }}>
      <Suspense fallback={<CustomLoader loading={true} />}>
        {/* Sidebar */}
        {isAuthenticated && user?.role === "Superadmin" && (
          <Box sx={{ position: "fixed", width: "280px" }}>
            <SuperadminSidebar />
          </Box>
        )}
        {isAuthenticated && user?.role === "Admin" && !isPublicRoute && (
          <Box sx={{ position: "fixed", width: "280px" }}>
            <AdminSidebar />
          </Box>
        )}

        <Box sx={{ flexGrow: 1, ml: !isPublicRoute ? "280px" : 0 }}>
          {/* Header */}
          {isAuthenticated && !isPublicRoute && (
            <Header isSuperadmin={user?.role === "Superadmin"} />
          )}

          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Auth />} />

            {/* Private Routes */}
            <Route
              path="/"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  loading={loading}
                >
                  {user?.role === "Superadmin" ? (
                    <DashboardSuperadmin />
                  ) : (
                    <Dashboard />
                  )}
                </PrivateRoute>
              }
            />
            <Route
              path="/administrators"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  loading={loading}
                >
                  <Administrators />
                </PrivateRoute>
              }
            />
            <Route
              path="/administrator/profile"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AdminProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/attendances"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  loading={loading}
                >
                  <Attendances />
                </PrivateRoute>
              }
            />
            <Route
              path="/company/profile"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  loading={loading}
                >
                  <CompanyProfile />
                </PrivateRoute>
              }
            />
            {/* Nested Routes for Departments */}
            <Route
              path="/departments/*"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  loading={loading}
                >
                  <Routes>
                    <Route path="" element={<Departments />} />
                    <Route path=":name" element={<DepartmentDetails />} />
                    <Route
                      path="*"
                      element={<Navigate to="/departments" replace />}
                    />
                  </Routes>
                </PrivateRoute>
              }
            />
            {/* Nested Routes for Employees */}
            <Route
              path="/employees/*"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  loading={loading}
                >
                  <Routes>
                    <Route path="" element={<Employees />} />
                    <Route path=":username" element={<EmployeeDetails />} />
                    <Route
                      path="*"
                      element={<Navigate to="/employees" replace />}
                    />
                  </Routes>
                </PrivateRoute>
              }
            />
            <Route
              path="/holidays"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  loading={loading}
                >
                  <Holidays />
                </PrivateRoute>
              }
            />
            <Route
              path="/leaves"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  loading={loading}
                >
                  <Leaves />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  loading={loading}
                >
                  <Settings />
                </PrivateRoute>
              }
            />
            <Route
              path="/administrators/:usernameAdmin"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  loading={loading}
                >
                  <AdminProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/companies/:companyName"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  loading={loading}
                >
                  <CompanyProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/companies"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  loading={loading}
                >
                  <CompaniesList />
                </PrivateRoute>
              }
            />
            {/* Catch-all Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Suspense>
    </Box>
  );
};

export default Pages;

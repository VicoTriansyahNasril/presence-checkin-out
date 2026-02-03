import React, { useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdmin } from "../redux/slices/adminSlice";
import { Box } from "@mui/material";
import CustomLoader from "../components/Elements/CustomLoader";

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
const DashboardSuperadmin = lazy(() => import("./Dashboard/DashboardSuperadmin"));
const PrivateRoute = lazy(() => import("./PrivateRoute"));
const AdminSidebar = lazy(() => import("../components/Navigation/AdminSidebar"));
const SuperadminSidebar = lazy(() => import("../components/Navigation/SuperadminSidebar"));
const Header = lazy(() => import("../components/Header"));

const CompaniesList = lazy(() => import("./Companies"));

const Pages = () => {
  const { isAuthenticated, user, loading: authLoading } = useAuth(); // Rename loading jadi authLoading
  const location = useLocation();
  const dispatch = useDispatch();

  const adminData = useSelector((state) => state.admin.data);
  // Tambahkan state loading dari admin slice
  const adminLoading = useSelector((state) => state.admin.loading);

  const isPublicRoute = location.pathname === "/login";

  // Fetch admin data based on role
  useEffect(() => {
    // Kita gunakan user dari context langsung, tidak perlu parsing localStorage lagi
    if (isAuthenticated && user) {
      if (user.role === "Admin" && !adminData) {
        // Hanya fetch jika data belum ada
        dispatch(fetchAdmin(user.id_admin));
      }
      // else if (user.role === "Superadmin") { ... }
    }
  }, [dispatch, isAuthenticated, user, adminData]);

  // LOGIKA LOADER DIPERBAIKI:
  // Tampilkan loader jika:
  // 1. Auth sedang memproses (authLoading)
  // 2. User adalah Admin TAPI data admin belum siap (sedang fetch atau null)
  const shouldShowLoader =
    authLoading ||
    (isAuthenticated && user?.role === "Admin" && !adminData);

  if (shouldShowLoader) {
    // Paksa loading={true} agar spinner muncul
    return <CustomLoader loading={true} />;
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
                  loading={authLoading}
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
                  loading={authLoading}
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
                  loading={authLoading}
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
                  loading={authLoading}
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
                  loading={authLoading}
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
                  loading={authLoading}
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
                  loading={authLoading}
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
                  loading={authLoading}
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
                  loading={authLoading}
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
                  loading={authLoading}
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
                  loading={authLoading}
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
                  loading={authLoading}
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
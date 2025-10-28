import React, { useState, useEffect } from "react";
import { Box, Typography, Breadcrumbs } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import { useSelector } from "react-redux";
import DirectionRight from "/assets/icons/direction-right.svg";
import {
  decodeDepartmentName,
  getGreetingMessage,
  getFormattedDate,
} from "../utils/headerUtils";
import { messages, breadcrumbsMessages } from "../messages/headerMessages";
import { titleMap, subtitleMap } from "../constants/headerConstants";
import appConstants from "../constants/appConstants"; 

const Header = ({ isSuperadmin = false }) => {
  const location = useLocation();
  const [greeting, setGreeting] = useState("");
  const [dateTime, setDateTime] = useState("");

  // Ambil data admin atau superadmin dari Redux
  const userData = isSuperadmin
    ? useSelector((state) => state.superadmin?.data)
    : useSelector((state) => state.admin?.data);

  const userName =
    userData && userData.data
      ? `${userData.data.first_name || userData.data.name} ${
          userData.data.last_name || ""
        }`
      : messages.loading;

  const userPicture = userData?.data?.profile_picture || "";

  const userRole = isSuperadmin ? "Superadmin" : userData?.role || "Admin";

  // Ambil data company dari Redux
  const companyData = useSelector((state) => state.company.detailCompany);
  const companyLoading = useSelector((state) => state.company.loading);

  // Ambil data admin dari Redux
  const adminData = useSelector((state) => state.admin.adminDetail);

  useEffect(() => {
    if (!companyLoading && !companyData) {
      // Logics for handling if company data is loading or unavailable can be added here
    }
  }, [companyData, companyLoading]);

  // Jangan tampilkan "Loading..." jika companyData sudah tersedia
  const companyProfileName = companyData?.company_name || messages.loading;
  const adminName = adminData
    ? `${adminData.first_name} ${adminData.last_name}`
    : messages.loading;

  // Ambil data employee dari Redux
  const employee = useSelector((state) => state.employees.selectedEmployee);
  const employeeName = employee
    ? `${employee.data.first_name} ${employee.data.last_name}`
    : messages.loading;

  // Pengecekan lokasi department, employee, admin, dan company detail
  const isDepartmentDetail = location.pathname.startsWith("/departments/");
  const isEmployeeDetail = location.pathname.startsWith("/employees/");
  const isAdminDetail = location.pathname.startsWith("/administrators/");
  const isCompanyDetail = location.pathname.startsWith("/companies/");
  const departmentName = isDepartmentDetail
    ? decodeDepartmentName(location.pathname.split("/")[2])
    : messages.loading;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getUTCHours() + 7; // WIB time (UTC +7)
      setGreeting(getGreetingMessage(hours));
      setDateTime(messages.nowIts(getFormattedDate(now)));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fungsi untuk mendapatkan title yang tepat
  const getTitle = () => {
    if (isAdminDetail && adminName) {
      return adminName;
    } else if (isDepartmentDetail && departmentName !== messages.loading) {
      return `${departmentName} Department`;
    } else if (isEmployeeDetail && employeeName !== messages.loading) {
      return employeeName;
    } else if (isCompanyDetail && companyProfileName) {
      return companyProfileName;
    } else {
      const title = titleMap[location.pathname];
      return typeof title === "function"
        ? title(isSuperadmin, userName)
        : title || messages.loading;
    }
  };

  // Fungsi untuk mendapatkan subtitle dan breadcrumbs yang tepat
  const getSubtitle = () => {
    if (isAdminDetail && adminName !== messages.loading) {
      return (
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<img src={DirectionRight} />}
        >
          <Link
            to="/administrators"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {breadcrumbsMessages.allAdministrators}
          </Link>
          <Typography color={appConstants.COLOR_SECONDARY}>
            {adminName}
          </Typography>
        </Breadcrumbs>
      );
    } else if (isCompanyDetail && companyProfileName) {
      return (
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<img src={DirectionRight} />}
        >
          <Link
            to="/companies"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {breadcrumbsMessages.allCompanies}
          </Link>
          <Typography color={appConstants.COLOR_SECONDARY}>
            {companyProfileName}
          </Typography>
        </Breadcrumbs>
      );
    } else if (isDepartmentDetail && departmentName !== messages.loading) {
      return (
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<img src={DirectionRight} />}
        >
          <Link
            to="/departments"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {breadcrumbsMessages.allDepartments}
          </Link>
          <Typography color={appConstants.COLOR_SECONDARY}>
            {departmentName}
          </Typography>
        </Breadcrumbs>
      );
    } else if (isEmployeeDetail && employeeName !== messages.loading) {
      return (
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<img src={DirectionRight} />}
        >
          <Link
            to="/employees"
            style={{ textDecoration: "none", color: appConstants.COLOR_DARK }}
          >
            {breadcrumbsMessages.allEmployees}
          </Link>
          <Typography color={appConstants.COLOR_DARK}>
            {employeeName}
          </Typography>
        </Breadcrumbs>
      );
    } else {
      const subtitle = subtitleMap[location.pathname];
      return typeof subtitle === "function"
        ? subtitle(greeting, dateTime)
        : subtitle || "";
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "white",
        px: "16px",
      }}
    >
      <Box>
        <Typography
          sx={{ fontWeight: "fontWeightMedium", fontSize: "fontSizeMedium" }}
        >
          {getTitle()}
        </Typography>
        <Typography
          sx={{
            color: appConstants.COLOR_SECONDARY,
            fontWeight: "fontWeightLight",
            fontSize: "fontSizeSmall",
          }}
        >
          {getSubtitle()}
        </Typography>
      </Box>

      <ProfileCard
        isSuperadmin={isSuperadmin}
        userName={userName}
        userRole={userRole}
        userPicture={userPicture}
      />
    </Box>
  );
};

export default Header;

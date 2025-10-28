import React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { FormControlLabel, Checkbox } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useFormik } from "formik";
import {
  CustomButton,
  CustomInput,
  CustomTypography,
} from "../../components/Elements";
import { useAuth } from "../../context/AuthContext";
import validationSchema from "../../validation/authValidation"; // Import validationSchema dari luar
import { authConstants } from "../../constants/authConstants"; // Import authConstants untuk asset paths

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.primary.lightPrimary5
      : theme.palette.primary.lightPrimary5,
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 30,
  height: "100%",
}));

const LoginForm = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(4),
}));

const Login = () => {
  const { login } = useAuth(); // Tidak perlu ambil loading dari useAuth

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema, // Gunakan validationSchema yang diimport
    onSubmit: async (values) => {
      await login(values.username, values.password);
    },
  });

  return (
    <Box sx={{ backgroundColor: (theme) => theme.palette.background.default }}>
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} sm={12} md={8} lg={8}>
          {" "}
          {/* item boolean */}
          <Item>
            <img
              src={authConstants.ASSETS.LOGIN_BG} // Menggunakan path dari authConstants
              alt="login-bg"
              style={{ width: "80%", height: "auto", margin: 0 }}
            />
          </Item>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          {" "}
          {/* item boolean */}
          <LoginForm component="form" onSubmit={formik.handleSubmit}>
            <CustomTypography
              variant="h5"
              fontWeight="fontWeightBold"
              fontSize="medium"
              gutterBottom
            >
              Presensi
            </CustomTypography>
            <CustomTypography
              variant="subtitle1"
              fontWeight="fontWeightLight"
              fontSize="small"
              color="secondary.main"
              gutterBottom
            >
              Please login here
            </CustomTypography>
            <CustomInput
              label="Username"
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <CustomInput
              label="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Remember Me"
              sx={{
                alignSelf: "flex-start",
                marginTop: "8px",
                fontSize: (theme) => theme.typography.fontSize.small,
                fontWeight: (theme) => theme.typography.fontWeightLight,
              }}
            />
            <CustomButton colorScheme="bgBlue" type="submit">
              Login
            </CustomButton>
          </LoginForm>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
  
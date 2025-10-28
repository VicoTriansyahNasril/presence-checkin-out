import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import {
  fetchCountries,
  fetchProvinces,
  fetchCities,
  fetchDistricts,
  fetchPostalCodes,
} from "../../services/apis/utilService";
import { CustomInput, CustomButton } from "../../components/Elements";
import { fetchAllDepartments } from "../../redux/slices/departmentSlice";
import { useSelector, useDispatch } from "react-redux";
import createValidationSchema from "../../validation/employeeValidation";
import {
  LABEL_TABS,
  DOWNLOAD_IMPORT_EMPLOYEE,
  OPTIONS_STATUS,
} from "../../constants/employeesConstants";
import ICONS from "../../constants/iconConstants";

const AddOrEditEmployeeForm = forwardRef(
  ({ onSubmit, initialValues, isEditMode, tabName }, ref) => {
    const [locationData, setLocationData] = useState({
      provinces: [],
      cities: [],
      districts: [],
      postalCodes: [],
      nationalities: [],
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const departments = useSelector((state) => state.departments.data);
    const dispatch = useDispatch();
    const classes = useStyles();

    const validationSchema = createValidationSchema(tabName, isEditMode);

    const formik = useFormik({
      initialValues: initialValues,
      enableReinitialize: true,
      validationSchema: validationSchema,
      onSubmit: (values) => {
        if (onSubmit) {
          onSubmit(values, selectedFile);
        }
      },
    });

    const handleFileChange = (event) => setSelectedFile(event.target.files[0]);

    useImperativeHandle(ref, () => ({
      submitForm: () => {
        formik.handleSubmit();
      },
    }));

    // Hanya load departments saat tabName adalah PROFESSIONAL
    useEffect(() => {
      if (
        (tabName === LABEL_TABS.PROFESSIONAL ||
          tabName === LABEL_TABS.ADD_ONE) &&
        departments.length === 0
      ) {
        dispatch(fetchAllDepartments());
      }
    }, [dispatch, departments.length, tabName]);

    // Hanya load nationalities saat tabName adalah PERSONAL
    useEffect(() => {
      if (tabName === LABEL_TABS.PERSONAL) {
        const loadCountries = async () => {
          try {
            const nationalities = await fetchCountries();
            setLocationData((prevData) => ({
              ...prevData,
              nationalities,
            }));
          } catch (error) {
            console.error("Error fetching nationalities:", error);
          }
        };
        loadCountries();
      }
    }, [tabName]);

    // Load provinces saat tabName adalah PERSONAL
    useEffect(() => {
      if (tabName === LABEL_TABS.PERSONAL) {
        const loadProvinces = async () => {
          try {
            const provinces = await fetchProvinces();
            setLocationData((prevData) => ({
              ...prevData,
              provinces,
            }));
          } catch (error) {
            console.error("Error fetching provinces:", error);
          }
        };
        loadProvinces();
      }
    }, [tabName]);

    // Load cities when province changes (hanya saat tabName adalah PERSONAL)
    useEffect(() => {
      if (
        tabName === LABEL_TABS.PERSONAL &&
        formik.values.province &&
        locationData.provinces.length > 0
      ) {
        const loadCities = async () => {
          try {
            const selectedProvince = locationData.provinces.find(
              (province) => province.text === formik.values.province
            );
            if (selectedProvince) {
              const cities = await fetchCities(selectedProvince.id);
              setLocationData((prevData) => ({
                ...prevData,
                cities,
                districts: [],
                postalCodes: [],
              }));
            }
          } catch (error) {
            console.error("Error fetching cities:", error);
          }
        };
        loadCities();
      }
    }, [formik.values.province, locationData.provinces, tabName]);

    // Load districts when city changes (hanya saat tabName adalah PERSONAL)
    useEffect(() => {
      if (
        tabName === LABEL_TABS.PERSONAL &&
        formik.values.city &&
        locationData.cities.length > 0
      ) {
        const loadDistricts = async () => {
          try {
            const selectedCity = locationData.cities.find(
              (city) => city.text === formik.values.city
            );
            if (selectedCity) {
              const districts = await fetchDistricts(selectedCity.id);
              setLocationData((prevData) => ({
                ...prevData,
                districts,
                postalCodes: [],
              }));
            }
          } catch (error) {
            console.error("Error fetching districts:", error);
          }
        };
        loadDistricts();
      }
    }, [formik.values.city, locationData.cities, tabName]);

    // Load postal codes when district changes (hanya saat tabName adalah PERSONAL)
    useEffect(() => {
      if (
        tabName === LABEL_TABS.PERSONAL &&
        formik.values.district &&
        locationData.districts.length > 0
      ) {
        const loadPostalCodes = async () => {
          try {
            const selectedCity = locationData.cities.find(
              (city) => city.text === formik.values.city
            );
            const selectedDistrict = locationData.districts.find(
              (district) => district.text === formik.values.district
            );
            if (selectedCity && selectedDistrict) {
              const postalCodes = await fetchPostalCodes(
                selectedCity.id,
                selectedDistrict.id
              );
              setLocationData((prevData) => ({
                ...prevData,
                postalCodes,
              }));
            }
          } catch (error) {
            console.error("Error fetching postal codes:", error);
          }
        };
        loadPostalCodes();
      }
    }, [formik.values.district, locationData.districts, tabName]);

    return (
      <Box component={"form"} onSubmit={formik.handleSubmit}>
        {tabName === LABEL_TABS.PERSONAL && (
          <>
            <Box sx={classes.textField}>
              <CustomInput
                label="First Name"
                type="text"
                name="first_name"
                value={formik.values.first_name || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.first_name && Boolean(formik.errors.first_name)
                }
                helperText={
                  formik.touched.first_name && formik.errors.first_name
                }
                fullWidth
              />
              <CustomInput
                label="Last Name"
                type="text"
                name="last_name"
                value={formik.values.last_name || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.last_name && Boolean(formik.errors.last_name)
                }
                helperText={formik.touched.last_name && formik.errors.last_name}
                fullWidth
              />
            </Box>
            <Box sx={classes.textField}>
              <CustomInput
                label="Date of Birth"
                type="date"
                name="date_of_birth"
                value={formik.values.date_of_birth || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.date_of_birth &&
                  Boolean(formik.errors.date_of_birth)
                }
                helperText={
                  formik.touched.date_of_birth && formik.errors.date_ofbirth
                }
                fullWidth
              />
              <CustomInput
                label="Mobile Number"
                type="text"
                name="mobile_number"
                value={formik.values.mobile_number || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.mobile_number &&
                  Boolean(formik.errors.mobile_number)
                }
                helperText={
                  formik.touched.mobile_number && formik.errors.mobile_number
                }
                fullWidth
              />
            </Box>
            <Box sx={classes.textField}>
              <CustomInput
                label="Gender"
                type="select"
                name="gender"
                value={formik.values.gender || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                helperText={formik.touched.gender && formik.errors.gender}
                fullWidth
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                ]}
              />
              <CustomInput
                label="Marital Status"
                type="select"
                name="marital_status"
                value={formik.values.marital_status || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.marital_status &&
                  Boolean(formik.errors.marital_status)
                }
                helperText={
                  formik.touched.marital_status && formik.errors.marital_status
                }
                fullWidth
                options={[
                  { value: "Married", label: "Married" },
                  { value: "Not Married", label: "Not Married" },
                  { value: "Widowed", label: "Widowed" },
                ]}
              />
            </Box>
            <Box sx={classes.textField}>
              <CustomInput
                label="Nationality"
                type="select"
                name="nationality"
                value={formik.values.nationality || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.nationality &&
                  Boolean(formik.errors.nationality)
                }
                helperText={
                  formik.touched.nationality && formik.errors.nationality
                }
                fullWidth
                options={locationData.nationalities}
              />
              <CustomInput
                label="Address"
                type="text"
                name="address"
                value={formik.values.address || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                fullWidth
              />
            </Box>
            <Box sx={classes.textField}>
              <CustomInput
                label="Province"
                type="select"
                name="province"
                value={formik.values.province || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.province && Boolean(formik.errors.province)
                }
                helperText={formik.touched.province && formik.errors.province}
                fullWidth
                options={locationData.provinces.map((prov) => ({
                  value: prov.text,
                  label: prov.text,
                }))}
              />
              <CustomInput
                label="City"
                type="select"
                name="city"
                value={formik.values.city || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
                fullWidth
                options={locationData.cities.map((city) => ({
                  value: city.text,
                  label: city.text,
                }))}
                disabled={!formik.values.province}
              />
            </Box>
            <Box sx={classes.textField}>
              <CustomInput
                label="District"
                type="select"
                name="district"
                value={formik.values.district || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.district && Boolean(formik.errors.district)
                }
                helperText={formik.touched.district && formik.errors.district}
                fullWidth
                options={locationData.districts.map((dist) => ({
                  value: dist.text,
                  label: dist.text,
                }))}
                disabled={!formik.values.city}
              />
              <CustomInput
                label="Zip Code"
                type="select"
                name="zip_code"
                value={formik.values.zip_code || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.zip_code && Boolean(formik.errors.zip_code)
                }
                helperText={formik.touched.zip_code && formik.errors.zip_code}
                fullWidth
                options={locationData.postalCodes.map((code) => ({
                  value: code.text,
                  label: code.text,
                }))}
                disabled={!formik.values.district}
              />
            </Box>
          </>
        )}
        {tabName === LABEL_TABS.PROFESSIONAL && (
          <>
            <Box sx={classes.textField}>
              <CustomInput
                label="Employee Number"
                name="employee_number"
                value={formik.values.employee_number || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.employee_number &&
                  Boolean(formik.errors.employee_number)
                }
                helperText={
                  formik.touched.employee_number &&
                  formik.errors.employee_number
                }
                fullWidth
              />
              <CustomInput
                label="Username"
                name="username"
                value={formik.values.username || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
                fullWidth
              />
            </Box>
            <Box sx={classes.textField}>
              <CustomInput
                label="Status"
                type="select"
                name="status"
                value={formik.values.status || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.status && Boolean(formik.errors.status)}
                helperText={formik.touched.status && formik.errors.status}
                fullWidth
                options={OPTIONS_STATUS}
              />
              <CustomInput
                label="Email"
                type="email"
                name="email"
                value={formik.values.email || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                fullWidth
              />
            </Box>
            <Box sx={classes.textField}>
              <CustomInput
                label="Department"
                type="select"
                name="id_department"
                value={formik.values.id_department || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.id_department &&
                  Boolean(formik.errors.id_department)
                }
                helperText={
                  formik.touched.id_department && formik.errors.id_department
                }
                fullWidth
                options={departments.map((dept) => ({
                  value: dept.id,
                  label: dept.name,
                }))}
              />
              <CustomInput
                label="Role in Current Company"
                name="role_current_company"
                value={formik.values.role_current_company || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.role_current_company &&
                  Boolean(formik.errors.role_current_company)
                }
                helperText={
                  formik.touched.role_current_company &&
                  formik.errors.role_current_company
                }
                fullWidth
              />
            </Box>
            <Box sx={classes.textField}>
              <CustomInput
                label="Role in Client"
                name="role_in_client"
                value={formik.values.role_in_client || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.role_in_client &&
                  Boolean(formik.errors.role_in_client)
                }
                helperText={
                  formik.touched.role_in_client && formik.errors.role_in_client
                }
                fullWidth
              />
              <CustomInput
                label="Joining Date"
                type="date"
                name="joining_date"
                value={formik.values.joining_date || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.joining_date &&
                  Boolean(formik.errors.joining_date)
                }
                helperText={
                  formik.touched.joining_date && formik.errors.joining_date
                }
                fullWidth
              />
            </Box>
          </>
        )}
        {tabName === LABEL_TABS.CHANGE_PASSWORD && (
          <>
            <Box sx={classes.textField}>
              <CustomInput
                label="Enter new Password"
                type="password"
                name="new_password"
                value={formik.values.new_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.new_password &&
                  Boolean(formik.errors.new_password)
                }
                helperText={
                  formik.touched.new_password && formik.errors.new_password
                }
                fullWidth
              />
            </Box>
            <Box sx={classes.textField}>
              <CustomInput
                label="Re-type new Password"
                type="password"
                name="retype_new_password"
                value={formik.values.retype_new_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.retype_new_password &&
                  Boolean(formik.errors.retype_new_password)
                }
                helperText={
                  formik.touched.retype_new_password &&
                  formik.errors.retype_new_password
                }
                fullWidth
              />
            </Box>
          </>
        )}
        {tabName === LABEL_TABS.ADD_ONE && (
          <>
            <Box sx={classes.textField}>
              <CustomInput
                label="First Name"
                type="text"
                name="first_name"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.first_name && Boolean(formik.errors.first_name)
                }
                helperText={
                  formik.touched.first_name && formik.errors.first_name
                }
                fullWidth
              />
              <CustomInput
                label="Last Name"
                type="text"
                name="last_name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.last_name && Boolean(formik.errors.last_name)
                }
                helperText={formik.touched.last_name && formik.errors.last_name}
                fullWidth
              />
            </Box>
            <Box sx={classes.textField}>
              <CustomInput
                label="Username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
                fullWidth
              />
              <CustomInput
                label="Email"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                fullWidth
              />
            </Box>
            <Box sx={classes.textField}>
              <CustomInput
                label="Password"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                fullWidth
              />
              <CustomInput
                label="Employee Number"
                name="employee_number"
                value={formik.values.employee_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.employee_number &&
                  Boolean(formik.errors.employee_number)
                }
                helperText={
                  formik.touched.employee_number &&
                  formik.errors.employee_number
                }
                fullWidth
              />
            </Box>
            <Box sx={classes.textField}>
              <CustomInput
                label="Department"
                type="select"
                name="id_department"
                value={formik.values.id_department}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.id_department &&
                  Boolean(formik.errors.id_department)
                }
                helperText={
                  formik.touched.id_department && formik.errors.id_department
                }
                fullWidth
                options={departments.map((dept) => ({
                  value: dept.id,
                  label: dept.name,
                }))}
              />
              <CustomInput
                label="Role in Current Company"
                name="role_current_company"
                value={formik.values.role_current_company}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.role_current_company &&
                  Boolean(formik.errors.role_current_company)
                }
                helperText={
                  formik.touched.role_current_company &&
                  formik.errors.role_current_company
                }
                fullWidth
              />
            </Box>
          </>
        )}
        {tabName === LABEL_TABS.IMPORT && (
          <>
            <Box sx={classes.fileImport}>
              <CustomInput
                type="file"
                fileType="document"
                name="fileField"
                onChange={handleFileChange}
              />
              <Box sx={classes.fileImport}>
                <a
                  href={DOWNLOAD_IMPORT_EMPLOYEE}
                  download
                  style={{ textDecoration: "none" }}
                >
                  <CustomButton
                    variant="outlined"
                    colorScheme="bgOrange"
                    icon={ICONS.DOWNLOAD_TEMPLATE}
                  >
                    Download Template
                  </CustomButton>
                </a>
              </Box>
            </Box>
          </>
        )}
      </Box>
    );
  }
);

const useStyles = () => {
  return {
    textField: {
      display: "flex",
      gap: 2,
    },
    fileImport: {
      mt: 2,
    },
  };
};

export default AddOrEditEmployeeForm;

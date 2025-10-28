import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import dayjs from "dayjs";
import {
  fetchProvinces,
  fetchCities,
  fetchDistricts,
  fetchPostalCodes,
} from "../../services/apis/utilService";
import { CustomInput, CustomModal } from "../../components/Elements";
import validationSchema from "../../validation/companyValidation";
import companyConstants from "../../constants/companyConstants";

const AddOrEditCompanyForm = ({
  open,
  onClose,
  initialValues,
  isEditMode,
  onSubmit,
}) => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [postalCodes, setPostalCodes] = useState([]);

  // Mendapatkan data user dari localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Conditional rendering berdasarkan role
  const isSuperAdmin = user?.role === "Superadmin";

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit,
    validateOnChange: true, // Memicu validasi setiap ada perubahan pada input
    validateOnBlur: true, // Memicu validasi ketika input kehilangan fokus
  });

  // Load provinces on mount
  useEffect(() => {
    const loadProvinces = async () => {
      try {
        const provincesData = await fetchProvinces();
        setProvinces(provincesData);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    loadProvinces();
  }, []);

  // Load cities when state (province) changes
  useEffect(() => {
    if (formik.values.state) {
      const loadCities = async () => {
        try {
          const selectedProvince = provinces.find(
            (prov) => prov.text === formik.values.state
          );
          const citiesData = await fetchCities(selectedProvince.id);
          setCities(citiesData);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      };
      loadCities();
    }
  }, [formik.values.state, provinces]);

  // Load districts when city changes
  useEffect(() => {
    if (formik.values.city) {
      const loadDistricts = async () => {
        try {
          const selectedCity = cities.find(
            (city) => city.text === formik.values.city
          );
          const districtsData = await fetchDistricts(selectedCity.id);
          setDistricts(districtsData);
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      };
      loadDistricts();
    }
  }, [formik.values.city, cities]);

  // Load postal codes when district changes
  useEffect(() => {
    if (formik.values.district) {
      const loadPostalCodes = async () => {
        try {
          const selectedDistrict = districts.find(
            (district) => district.text === formik.values.district
          );
          const selectedCity = cities.find(
            (city) => city.text === formik.values.city
          );
          const postalCodesData = await fetchPostalCodes(
            selectedCity.id,
            selectedDistrict.id
          );
          setPostalCodes(postalCodesData);
        } catch (error) {
          console.error("Error fetching postal codes:", error);
        }
      };
      loadPostalCodes();
    }
  }, [formik.values.district, districts]);

  // Format the date to "MMMM D, YYYY"
  const formatDate = (date) => {
    return dayjs(date).format("MMMM D, YYYY");
  };

  return (
    <CustomModal open={open} onClose={onClose}>
      <CustomModal.Header onClose={onClose}>
        {isEditMode
          ? companyConstants.editCompany
          : companyConstants.addNewCompany}
      </CustomModal.Header>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <CustomInput
            label={companyConstants.companyNameLabel}
            name="company_name"
            value={formik.values.company_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.company_name && Boolean(formik.errors.company_name)
            }
            helperText={
              formik.touched.company_name && formik.errors.company_name
            }
            fullWidth
          />

          {!isSuperAdmin && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <CustomInput
                label={companyConstants.founderLabel}
                name="founder"
                value={formik.values.founder}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.founder && Boolean(formik.errors.founder)}
                helperText={formik.touched.founder && formik.errors.founder}
                fullWidth
              />
              <CustomInput
                label={companyConstants.foundedAtLabel}
                name="founded_at"
                type="date"
                value={formatDate(formik.values.founded_at) || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.founded_at && Boolean(formik.errors.founded_at)
                }
                helperText={
                  formik.touched.founded_at && formik.errors.founded_at
                }
                fullWidth
              />
            </Box>
          )}

          <Box sx={{ display: "flex", gap: 2 }}>
            <CustomInput
              label={companyConstants.emailLabel}
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
            />
            <CustomInput
              label={companyConstants.phoneLabel}
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              fullWidth
            />
          </Box>

          <CustomInput
            label={companyConstants.addressLabel}
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            fullWidth
          />

          {!isSuperAdmin && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <CustomInput
                label="Latitude"
                name="latitude"
                value={formik.values.latitude}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.latitude && Boolean(formik.errors.latitude)}
                helperText={formik.touched.latitude && formik.errors.latitude}
                fullWidth
              />
              <CustomInput
                label="Longitude"
                name="longitude"
                value={formik.values.longitude}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.longitude && Boolean(formik.errors.longitude)}
                helperText={formik.touched.longitude && formik.errors.longitude}
                fullWidth
              />
            </Box>
          )}

          <Box sx={{ display: "flex", gap: 2 }}>
            <CustomInput
              label={companyConstants.provinceLabel}
              name="state"
              type="select"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
              fullWidth
              options={provinces.map((prov) => ({
                value: prov.text,
                label: prov.text,
              }))}
            />

            <CustomInput
              label={companyConstants.cityLabel}
              name="city"
              type="select"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
              fullWidth
              options={cities.map((city) => ({
                value: city.text,
                label: city.text,
              }))}
              disabled={!formik.values.state}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <CustomInput
              label={companyConstants.districtLabel}
              name="district"
              type="select"
              value={formik.values.district}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.district && Boolean(formik.errors.district)}
              helperText={formik.touched.district && formik.errors.district}
              fullWidth
              options={districts.map((dist) => ({
                value: dist.text,
                label: dist.text,
              }))}
              disabled={!formik.values.city}
            />
            <CustomInput
              label={companyConstants.zipCodeLabel}
              name="zip_code"
              type="select"
              value={formik.values.zip_code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.zip_code && Boolean(formik.errors.zip_code)}
              helperText={formik.touched.zip_code && formik.errors.zip_code}
              fullWidth
              options={postalCodes.map((code) => ({
                value: code.text,
                label: code.text,
              }))}
              disabled={!formik.values.district}
            />
          </Box>

          <CustomInput
            label={companyConstants.joiningDateLabel}
            name="joining_date"
            type="date"
            value={
              formik.values.joining_date
                ? dayjs(formik.values.joining_date).format("YYYY-MM-DD")
                : ""
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.joining_date && Boolean(formik.errors.joining_date)
            }
            helperText={
              formik.touched.joining_date && formik.errors.joining_date
            }
            fullWidth
          />
        </Box>
      </Box>
      <CustomModal.Footer onClose={onClose} onSubmit={formik.handleSubmit}>
        {isEditMode
          ? companyConstants.saveButtonLabel
          : companyConstants.addButtonLabel}
      </CustomModal.Footer>
    </CustomModal>
  );
};

export default AddOrEditCompanyForm;

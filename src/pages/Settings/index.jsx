import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCompanyConfig,
  updateCompanyConfig,
} from "../../redux/slices/companySlice";
import { messages } from "../../messages/settingsMessages";
import { labels, titles } from "../../constants/settingsConstants";
import WorkingSection from "./WorkingSection";
import CiCoSection from "./CiCoSection";
import BreakTimeSection from "./BreakTimeSection";
import GeolocationSection from "./GeolocationSection";
import TermsConditionSection from "./TermsConditionSection"; 

const Settings = () => {
  const dispatch = useDispatch();
  const { config, loading, updateSuccess, updateError } = useSelector(
    (state) => state.company
  );

  const [formData, setFormData] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [editModes, setEditModes] = useState({
    workingSection: false,
    ciCoSection: false,
    breakTimeSection: false,
    geolocationSection: false,
    termsConditionsSection: false, // Tambahkan untuk TermsConditionSection
  });

  useEffect(() => {
    dispatch(fetchCompanyConfig());
  }, [dispatch]);

  useEffect(() => {
    if (updating && updateSuccess) {
      Swal.fire({
        icon: labels.successIcon,
        title: titles.successTitle,
        text: messages.updateSuccess,
      });
      setUpdating(false);
    }
  }, [updating, updateSuccess]);

  useEffect(() => {
    if (updating && updateError) {
      Swal.fire({
        icon: labels.errorIcon,
        title: titles.errorTitle,
        text: messages.updateError,
      });
      setUpdating(false);
    }
  }, [updating, updateError]);

  useEffect(() => {
    if (config) {
      setFormData({
        workingDayStart: config.working_day_start || "",
        workingDayEnd: config.working_day_end || "",
        workingHourStart: config.working_hours_start?.slice(0, 5) || "",
        workingHourEnd: config.working_hours_end?.slice(0, 5) || "",
        workingDuration: (config.working_duration / 60).toString() || "0",
        flexibleWorkingDays: config.working_day_flexible || false,
        flexibleWorkingHours: config.working_hours_flexible || false,
        flexibleWorkingDuration: config.working_duration_flexible || false,
        checkInTolerance: config.check_in_tolerance?.toString() || "0",
        flexibleCiTolerance: config.check_in_tolerance_flexible || false,
        checkOutTolerance: config.check_out_tolerance?.toString() || "0",
        flexibleCoTolerance: config.check_out_tolerance_flexible || false,
        autoCheckOut: config.auto_check_out_time?.slice(0, 5) || "",
        selfieMode: config.selfie_mode || false,
        breakTimeDuration: config.break_time?.toString() || "0",
        flexibleBreakTime: config.break_time_flexible || false,
        breakTimeTolerance: config.after_break_tolerance?.toString() || "0",
        flexibleBreakTimeTolerance:
          config.after_break_tolerance_flexible || false,
        geolocationMode: config.geolocation || false,
        distanceRadius: config.geolocation_radius?.toString() || "", // Handle null value for geolocation_radius
        flexibleGeolocationMode: config.flexible_geolocation_mode || false,
        termsConditions: config.terms_conditions || "", // Handle null value for termsConditions
        defaultHoliday: config.default_holiday || false,
      });
    }
  }, [config]);

  const handleEditClick = (section) => {
    setEditModes((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleSaveClick = (section) => {
    if (formData) {
      const requestData = {
        working_day_start: formData.workingDayStart,
        working_day_end: formData.workingDayEnd,
        working_hours_start: `${formData.workingHourStart}:00`,
        working_hours_end: `${formData.workingHourEnd}:00`,
        working_duration: parseInt(formData.workingDuration) * 60,
        working_day_flexible: formData.flexibleWorkingDays,
        working_hours_flexible: formData.flexibleWorkingHours,
        working_duration_flexible: formData.flexibleWorkingDuration,
        check_in_tolerance: parseInt(formData.checkInTolerance),
        check_in_tolerance_flexible: formData.flexibleCiTolerance,
        check_out_tolerance: parseInt(formData.checkOutTolerance),
        check_out_tolerance_flexible: formData.flexibleCoTolerance,
        auto_check_out_time: `${formData.autoCheckOut}:00`,
        selfie_mode: formData.selfieMode,
        break_time: parseInt(formData.breakTimeDuration),
        break_time_flexible: formData.flexibleBreakTime,
        after_break_tolerance: parseInt(formData.breakTimeTolerance),
        after_break_tolerance_flexible: formData.flexibleBreakTimeTolerance,
        geolocation: formData.geolocationMode,
        geolocation_radius: formData.distanceRadius
          ? parseInt(formData.distanceRadius)
          : null,
        terms_conditions: formData.termsConditions, // Data dari Rich Text Editor
        default_holiday: formData.defaultHoliday,
      };

      const isDataChanged =
        JSON.stringify(requestData) !== JSON.stringify(config);

      if (!isDataChanged) {
        console.log(messages.noChanges);
        return; // Jangan lanjutkan jika tidak ada perubahan pada data apapun
      }

      setUpdating(true);
      dispatch(updateCompanyConfig(requestData))
        .unwrap()
        .then(() => {
          dispatch(fetchCompanyConfig())
            .unwrap()
            .then(() => {
              setEditModes((prevState) => ({
                ...prevState,
                [section]: false,
              }));
            })
            .catch((error) => {
              Swal.fire({
                icon: labels.errorIcon,
                title: titles.errorTitle,
                text: messages.fetchError,
              });
            });
        })
        .catch((error) => {
          Swal.fire({
            icon: labels.errorIcon,
            title: titles.errorTitle,
            text: messages.updateError,
          });
          console.error(messages.sectionUpdateError, error);
        });
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSwitchChange = (field) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  if (!formData) {
    return null; // Tampilkan null atau elemen lain jika data belum ada
  }

  return (
    <Box sx={{ padding: 2, margin: 2 }}>
      <WorkingSection
        formData={formData}
        editMode={editModes.workingSection}
        handleInputChange={handleInputChange}
        handleEditClick={handleEditClick}
        handleSaveClick={handleSaveClick}
        handleSwitchChange={handleSwitchChange}
      />

      <CiCoSection
        formData={formData}
        editMode={editModes.ciCoSection}
        handleInputChange={handleInputChange}
        handleEditClick={handleEditClick}
        handleSaveClick={handleSaveClick}
        handleSwitchChange={handleSwitchChange}
      />

      <BreakTimeSection
        formData={formData}
        editMode={editModes.breakTimeSection}
        handleInputChange={handleInputChange}
        handleEditClick={handleEditClick}
        handleSaveClick={handleSaveClick}
        handleSwitchChange={handleSwitchChange}
      />

      <GeolocationSection
        formData={formData}
        editMode={editModes.geolocationSection}
        handleInputChange={handleInputChange}
        handleSwitchChange={handleSwitchChange}
        handleEditClick={handleEditClick}
        handleSaveClick={handleSaveClick}
      />

      <TermsConditionSection
        formData={formData}
        handleInputChange={handleInputChange}
        editMode={editModes.termsConditionsSection}
        handleEditClick={handleEditClick}
        handleSaveClick={handleSaveClick}
      />
    </Box>
  );
};

export default Settings;

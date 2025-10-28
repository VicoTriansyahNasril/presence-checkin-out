import React from "react";
import { Grid, Box, Switch, FormControlLabel } from "@mui/material";
import { CustomInput, CustomTypography } from "../../components/Elements";
import SectionAccordion from "../../components/Cards/SectionAccordion";
import { labels } from "../../constants/settingsConstants"; // Import labels dari constants

const CiCoSection = ({
  formData,
  editMode,
  handleInputChange,
  handleSwitchChange,
  handleEditClick,
  handleSaveClick,
}) => {
  return (
    <SectionAccordion
      title={labels.ciCoSectionTitle} // Menggunakan label dari constants
      subtitle={labels.ciCoSectionSubtitle} // Menggunakan label dari constants
      editMode={editMode}
      onEditClick={() => handleEditClick("ciCoSection")}
      onCancelClick={() => handleEditClick("ciCoSection")}
      onSaveClick={() => handleSaveClick("ciCoSection")}
    >
      <Grid item xs={12}>
        <CustomTypography
          fontWeight="fontWeightLight"
          fontSize="fontSizeSmall"
          sx={{
            color: (theme) => theme.palette.secondary.main,
          }}
        >
          {labels.checkInToleranceLabel} {/* Menggunakan label dari constants */}
        </CustomTypography>
        {!editMode ? (
          <CustomTypography
            fontWeight="fontWeightLight"
            fontSize="fontSizeSmall"
          >
            {formData.flexibleCiTolerance
              ? labels.flexibleText
              : `${formData.checkInTolerance} ${labels.minutesLabel}`} {/* Menggunakan label dari constants */}
          </CustomTypography>
        ) : (
          <Box display="flex" alignItems="center" gap={2}>
            <CustomInput
              fullWidth
              type="number"
              hideLabel={true}
              value={formData.checkInTolerance}
              onChange={(e) =>
                handleInputChange("checkInTolerance", e.target.value)
              }
              sx={{ width: "25%" }}
              disabled={formData.flexibleCiTolerance}
            />
            <CustomTypography>{labels.minutesLabel}</CustomTypography>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.flexibleCiTolerance}
                  onChange={() => handleSwitchChange("flexibleCiTolerance")}
                />
              }
              label={labels.flexibleLabel} 
            />
          </Box>
        )}
      </Grid>

      <Grid item xs={12}>
        <CustomTypography
          fontWeight="fontWeightLight"
          fontSize="fontSizeSmall"
          sx={{
            color: (theme) => theme.palette.secondary.main,
          }}
        >
          {labels.checkOutToleranceLabel} {/* Menggunakan label dari constants */}
        </CustomTypography>
        {!editMode ? (
          <CustomTypography
            fontWeight="fontWeightLight"
            fontSize="fontSizeSmall"
          >
            {formData.flexibleCoTolerance
              ? labels.flexibleText
              : `${formData.checkOutTolerance} ${labels.minutesLabel}`} {/* Menggunakan label dari constants */}
          </CustomTypography>
        ) : (
          <Box display="flex" alignItems="center" gap={2}>
            <CustomInput
              fullWidth
              type="number"
              hideLabel={true}
              value={formData.checkOutTolerance}
              onChange={(e) =>
                handleInputChange("checkOutTolerance", e.target.value)
              }
              sx={{ width: "25%" }}
              disabled={formData.flexibleCoTolerance}
            />
            <CustomTypography>{labels.minutesLabel}</CustomTypography>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.flexibleCoTolerance}
                  onChange={() => handleSwitchChange("flexibleCoTolerance")}
                />
              }
              label={labels.flexibleLabel} 
            />
          </Box>
        )}
      </Grid>

      <Grid item xs={12}>
        <CustomTypography
          fontWeight="fontWeightLight"
          fontSize="fontSizeSmall"
          sx={{
            color: (theme) => theme.palette.secondary.main,
          }}
        >
          {labels.autoCheckOutTimeLabel} {/* Menggunakan label dari constants */}
        </CustomTypography>
        {!editMode ? (
          <CustomTypography
            fontWeight="fontWeightLight"
            fontSize="fontSizeSmall"
          >
            {formData.autoCheckOut}
          </CustomTypography>
        ) : (
          <Box display="flex" alignItems="center" gap={1}>
            <CustomInput
              fullWidth
              type="text"
              hideLabel={true}
              value={formData.autoCheckOut}
              onChange={(e) =>
                handleInputChange("autoCheckOut", e.target.value)
              }
              sx={{ width: "25%" }}
            />
          </Box>
        )}
      </Grid>

      <Grid item xs={12}>
        <CustomTypography
          fontWeight="fontWeightLight"
          fontSize="fontSizeSmall"
          sx={{
            color: (theme) => theme.palette.secondary.main,
          }}
        >
          {labels.selfieModeLabel} {/* Menggunakan label dari constants */}
        </CustomTypography>
        {!editMode ? (
          <CustomTypography
            fontWeight="fontWeightLight"
            fontSize="fontSizeSmall"
          >
            {formData.selfieMode ? labels.onText : labels.offText} {/* Menggunakan label dari constants */}
          </CustomTypography>
        ) : (
          <Box display="flex" alignItems="center" gap={1}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.selfieMode}
                  onChange={() => handleSwitchChange("selfieMode")}
                />
              }
            />
          </Box>
        )}
      </Grid>
    </SectionAccordion>
  );
};

export default CiCoSection;

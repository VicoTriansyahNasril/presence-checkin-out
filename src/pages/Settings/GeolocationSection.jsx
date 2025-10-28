import React from "react";
import { Grid, Box, Switch, FormControlLabel } from "@mui/material";
import { CustomInput, CustomTypography } from "../../components/Elements";
import SectionAccordion from "../../components/Cards/SectionAccordion";
import { labels } from "../../constants/settingsConstants"; // Import labels dari constants

const GeolocationSection = ({
  formData,
  editMode,
  handleInputChange,
  handleSwitchChange,
  handleEditClick,
  handleSaveClick,
}) => {
  return (
    <SectionAccordion
      title={labels.geolocationSectionTitle} // Menggunakan label dari constants
      subtitle={labels.geolocationSectionSubtitle} // Menggunakan subtitle dari constants
      editMode={editMode}
      onEditClick={() => handleEditClick("geolocationSection")}
      onCancelClick={() => handleEditClick("geolocationSection")}
      onSaveClick={() => handleSaveClick("geolocationSection")}
    >
      <Grid item xs={12}>
        <CustomTypography
          fontWeight="fontWeightLight"
          fontSize="fontSizeSmall"
          sx={{
            color: (theme) => theme.palette.secondary.main,
          }}
        >
          {labels.geolocationModeLabel} 
        </CustomTypography>
        {!editMode ? (
          <CustomTypography
            fontWeight="fontWeightLight"
            fontSize="fontSizeSmall"
          >
            {formData.flexibleGeolocationMode
              ? labels.flexibleText
              : formData.geolocationMode
              ? labels.onText
              : labels.offText}{" "}
          
          </CustomTypography>
        ) : (
          <Box display="flex" alignItems="center" gap={1}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.geolocationMode}
                  onChange={() => handleSwitchChange("geolocationMode")}
                />
              }
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
          {labels.distanceRadiusLabel} 
        </CustomTypography>
        {!editMode ? (
          <CustomTypography
            fontWeight="fontWeightLight"
            fontSize="fontSizeSmall"
          >
            {formData.distanceRadius} {labels.metersLabel}{" "}
           
          </CustomTypography>
        ) : (
          <Box display="flex" alignItems="center" gap={1}>
            <CustomInput
              fullWidth
              type="number"
              hideLabel={true}
              value={formData.distanceRadius}
              onChange={(e) =>
                handleInputChange("distanceRadius", e.target.value)
              }
              sx={{ width: "25%" }}
              disabled={!formData.geolocationMode} // Disable if geolocationMode is off
            />
            <CustomTypography>{labels.metersLabel}</CustomTypography>{" "}
            
          </Box>
        )}
      </Grid>
    </SectionAccordion>
  );
};

export default GeolocationSection;

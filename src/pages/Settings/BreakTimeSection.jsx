import React from "react";
import { Grid, Box, Switch, FormControlLabel } from "@mui/material";
import { CustomInput, CustomTypography } from "../../components/Elements";
import SectionAccordion from "../../components/Cards/SectionAccordion";
import { labels } from "../../constants/settingsConstants"; // Import labels dari constants

const BreakTimeSection = ({
  formData,
  editMode,
  handleInputChange,
  handleSwitchChange,
  handleEditClick,
  handleSaveClick,
}) => {
  return (
    <SectionAccordion
      title={labels.breakTimeSectionTitle} // Menggunakan label dari constants
      subtitle={labels.breakTimeSectionSubtitle} // Menggunakan subtitle dari constants
      editMode={editMode}
      onEditClick={() => handleEditClick("breakTimeSection")}
      onCancelClick={() => handleEditClick("breakTimeSection")}
      onSaveClick={() => handleSaveClick("breakTimeSection")}
    >
      <Grid item xs={12}>
        <CustomTypography
          fontWeight="fontWeightLight"
          fontSize="fontSizeSmall"
          sx={{
            color: (theme) => theme.palette.secondary.main,
          }}
        >
          {labels.breakTimeDurationLabel} {/* Menggunakan label dari constants */}
        </CustomTypography>
        {!editMode ? (
          <CustomTypography
            fontWeight="fontWeightLight"
            fontSize="fontSizeSmall"
          >
            {formData.flexibleBreakTime
              ? labels.flexibleText
              : `${formData.breakTimeDuration} ${labels.minutesLabel}`} {/* Menggunakan label dari constants */}
          </CustomTypography>
        ) : (
          <Box display="flex" alignItems="center" gap={2}>
            <CustomInput
              fullWidth
              type="number"
              hideLabel={true}
              value={formData.breakTimeDuration}
              onChange={(e) =>
                handleInputChange("breakTimeDuration", e.target.value)
              }
              sx={{ width: "25%" }}
              disabled={formData.flexibleBreakTime}
            />
            <CustomTypography>{labels.minutesLabel}</CustomTypography>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.flexibleBreakTime}
                  onChange={() => handleSwitchChange("flexibleBreakTime")}
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
          {labels.breakTimeToleranceLabel} {/* Menggunakan label dari constants */}
        </CustomTypography>
        {!editMode ? (
          <CustomTypography
            fontWeight="fontWeightLight"
            fontSize="fontSizeSmall"
          >
            {formData.flexibleBreakTimeTolerance
              ? labels.flexibleText
              : `${formData.breakTimeTolerance} ${labels.minutesLabel}`} {/* Menggunakan label dari constants */}
          </CustomTypography>
        ) : (
          <Box display="flex" alignItems="center" gap={2}>
            <CustomInput
              fullWidth
              type="number"
              hideLabel={true}
              value={formData.breakTimeTolerance}
              onChange={(e) =>
                handleInputChange("breakTimeTolerance", e.target.value)
              }
              sx={{ width: "25%" }}
              disabled={formData.flexibleBreakTimeTolerance}
            />
            <CustomTypography>{labels.minutesLabel}</CustomTypography>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.flexibleBreakTimeTolerance}
                  onChange={() =>
                    handleSwitchChange("flexibleBreakTimeTolerance")
                  }
                />
              }
              label={labels.flexibleLabel} 
            />
          </Box>
        )}
      </Grid>
    </SectionAccordion>
  );
};

export default BreakTimeSection;

import React from "react";
import { Grid, Switch, FormControlLabel } from "@mui/material";
import { CustomInput, CustomTypography } from "../../components/Elements";
import SectionAccordion from "../../components/Cards/SectionAccordion";
import { labels } from "../../constants/settingsConstants"; // Import labels dari constants

const WorkingSection = ({
  formData,
  editMode,
  handleInputChange,
  handleSwitchChange,
  handleEditClick,
  handleSaveClick,
}) => {
  const daysOfWeek = labels.daysOfWeek; // Menggunakan labels dari constants
  const hours = labels.hours; // Menggunakan labels dari constants

  return (
    <SectionAccordion
      title={labels.workingSectionTitle} // Menggunakan label dari constants
      subtitle={labels.workingSectionSubtitle} // Menggunakan subtitle dari constants
      editMode={editMode}
      onEditClick={() => handleEditClick("workingSection")}
      onCancelClick={() => handleEditClick("workingSection")}
      onSaveClick={() => handleSaveClick("workingSection")}
    >
      {/* Working Days */}
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12}>
          <CustomTypography
            fontWeight="fontWeightLight"
            fontSize="fontSizeSmall"
            sx={{
              color: (theme) => theme.palette.secondary.main,
              marginBottom: 0,
            }}
          >
            {labels.workingDaysLabel} 
          </CustomTypography>
        </Grid>

        {!editMode ? (
          <Grid item xs={12}>
            <CustomTypography>
              {formData.flexibleWorkingDays
                ? labels.flexibleText
                : `${formData.workingDayStart} - ${formData.workingDayEnd}`}
            </CustomTypography>
          </Grid>
        ) : (
          <>
            <Grid item xs={5}>
              <CustomInput
                type="select"
                hideLabel={true}
                options={daysOfWeek.map((day) => ({
                  value: day,
                  label: day,
                }))}
                value={formData.workingDayStart}
                onChange={(e) =>
                  handleInputChange("workingDayStart", e.target.value)
                }
                fullWidth
                disabled={formData.flexibleWorkingDays}
              />
            </Grid>

            <Grid item xs={1}>
              <CustomTypography align="center">-</CustomTypography>
            </Grid>

            <Grid item xs={5}>
              <CustomInput
                type="select"
                hideLabel={true}
                options={daysOfWeek.map((day) => ({
                  value: day,
                  label: day,
                }))}
                value={formData.workingDayEnd}
                onChange={(e) =>
                  handleInputChange("workingDayEnd", e.target.value)
                }
                fullWidth
                disabled={formData.flexibleWorkingDays}
              />
            </Grid>
          </>
        )}

        {editMode && (
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.flexibleWorkingDays}
                  onChange={() => handleSwitchChange("flexibleWorkingDays")}
                />
              }
              label={labels.flexibleLabel} 
              sx={{ marginTop: 0, marginBottom: 0 }}
            />
          </Grid>
        )}
      </Grid>

      {/* Working Hours */}
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12}>
          <CustomTypography
            fontWeight="fontWeightLight"
            fontSize="fontSizeSmall"
            sx={{
              color: (theme) => theme.palette.secondary.main,
              marginBottom: 0,
            }}
          >
            {labels.workingHoursLabel} 
          </CustomTypography>
        </Grid>

        {!editMode ? (
          <Grid item xs={12}>
            <CustomTypography>
              {formData.flexibleWorkingHours
                ? labels.flexibleText
                : `${formData.workingHourStart} - ${formData.workingHourEnd}`}
            </CustomTypography>
          </Grid>
        ) : (
          <>
            <Grid item xs={5}>
              <CustomInput
                type="select"
                hideLabel={true}
                options={hours.map((hour) => ({
                  value: hour,
                  label: hour,
                }))}
                value={formData.workingHourStart}
                onChange={(e) =>
                  handleInputChange("workingHourStart", e.target.value)
                }
                fullWidth
                disabled={formData.flexibleWorkingHours}
                sx={{ minWidth: "80px" }}
              />
            </Grid>

            <Grid item xs={1}>
              <CustomTypography align="center">-</CustomTypography>
            </Grid>

            <Grid item xs={5}>
              <CustomInput
                type="select"
                hideLabel={true}
                options={hours.map((hour) => ({
                  value: hour,
                  label: hour,
                }))}
                value={formData.workingHourEnd}
                onChange={(e) =>
                  handleInputChange("workingHourEnd", e.target.value)
                }
                fullWidth
                disabled={formData.flexibleWorkingHours}
                sx={{ minWidth: "80px" }}
              />
            </Grid>
          </>
        )}

        {editMode && (
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.flexibleWorkingHours}
                  onChange={() => handleSwitchChange("flexibleWorkingHours")}
                />
              }
              label={labels.flexibleLabel} 
              sx={{ marginTop: 0, marginBottom: 0 }}
            />
          </Grid>
        )}
      </Grid>

      {/* Working Duration */}
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12}>
          <CustomTypography
            fontWeight="fontWeightLight"
            fontSize="fontSizeSmall"
            sx={{
              color: (theme) => theme.palette.secondary.main,
              marginBottom: 0,
            }}
          >
            {labels.workingDurationLabel} 
          </CustomTypography>
        </Grid>

        {!editMode ? (
          <Grid item xs={12}>
            <CustomTypography>
              {formData.flexibleWorkingDuration
                ? labels.flexibleText
                : `${formData.workingDuration} ${labels.hoursLabel}`} 
            </CustomTypography>
          </Grid>
        ) : (
          <>
            <Grid item xs={5}>
              <CustomInput
                type="number"
                hideLabel={true}
                value={formData.workingDuration}
                onChange={(e) =>
                  handleInputChange("workingDuration", e.target.value)
                }
                fullWidth
                disabled={formData.flexibleWorkingDuration}
              />
            </Grid>

            {editMode && (
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  spacing: 2,
                }}
              >
                <CustomTypography>{labels.hoursLabel}</CustomTypography> 
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.flexibleWorkingDuration}
                      onChange={() =>
                        handleSwitchChange("flexibleWorkingDuration")
                      }
                    />
                  }
                  label={labels.flexibleLabel} 
                  sx={{ marginTop: 0, marginBottom: 0, marginLeft: 2 }}
                />
              </Grid>
            )}
          </>
        )}
      </Grid>

      {/* Default Holiday */}
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12}>
          <CustomTypography
            fontWeight="fontWeightLight"
            fontSize="fontSizeSmall"
            sx={{
              color: (theme) => theme.palette.secondary.main,
              marginBottom: 0,
            }}
          >
            {labels.defaultHolidayLabel} 
          </CustomTypography>
        </Grid>

        {!editMode ? (
          <Grid item xs={12}>
            <CustomTypography>
              {formData.defaultHoliday ? labels.yesText : labels.noText} 
            </CustomTypography>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.defaultHoliday}
                  onChange={() => handleSwitchChange("defaultHoliday")}
                />
              }
              label={labels.useDefaultHolidayLabel} 
              sx={{ marginTop: 0, marginBottom: 0 }}
            />
          </Grid>
        )}
      </Grid>
    </SectionAccordion>
  );
};

export default WorkingSection;

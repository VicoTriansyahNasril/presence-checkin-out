// settingsConstants.js

export const labels = {
  workingSection: "Working Section",
  ciCoSection: "Check In/Check Out Section",
  breakTimeSection: "Break Time Section",
  geolocationSection: "Geolocation Section",
  termsConditionsSection: "Terms and Conditions Section",
  successIcon: "success",
  errorIcon: "error",
  defaultHoliday: "Default Holiday",
  saveButton: "Save",
  editButton: "Edit",

  // Label untuk SectionAccordion
  breakTimeSectionTitle: "Break Time Section",
  breakTimeSectionSubtitle: "Set break time duration and tolerance",

  // Label untuk form field
  breakTimeDurationLabel: "Break Time Duration",
  breakTimeToleranceLabel: "Break Time Tolerance",
  flexibleLabel: "Flexible",
  minutesLabel: "Minutes",

  // Label untuk status fleksibel
  flexibleText: "Flexible",

  // Label untuk SectionAccordion
  ciCoSectionTitle: "CI/CO Section",
  ciCoSectionSubtitle:
    "Set check in/check out tolerance time, auto check out time, and selfie mode",

  // Label untuk form field
  checkInToleranceLabel: "Check In Tolerance Duration (Before/After)",
  checkOutToleranceLabel: "Check Out Tolerance Duration (Before/After)",
  autoCheckOutTimeLabel: "Auto Check Out Time",
  selfieModeLabel: "Selfie Mode",

  // Label untuk fleksibilitas dan waktu
  flexibleLabel: "Flexible",
  flexibleText: "Flexible",
  minutesLabel: "Minutes",

  // On/Off text
  onText: "On",
  offText: "Off",

  // Label untuk SectionAccordion
  geolocationSectionTitle: "Geolocation Section",
  geolocationSectionSubtitle: "Set geolocation mode and distance radius",

  // Label untuk form field
  geolocationModeLabel: "Geolocation Mode",
  distanceRadiusLabel: "Distance Radius",
  metersLabel: "Meter(s)",

  // Label untuk fleksibilitas dan status
  flexibleText: "Flexible",
  onText: "On",
  offText: "Off",

  // Label untuk SectionAccordion
  termsConditionsSectionTitle: "Terms and Conditions Section",
  termsConditionsSectionSubtitle: "Set terms and conditions",

  // Label untuk form field
  termsConditionsLabel: "Terms and Conditions",
  noTermsAvailableText: "Terms and conditions belum tersedia",
  defaultTermsPlaceholder: "<p>Enter terms and conditions here...</p>",

  // Label untuk SectionAccordion
  workingSectionTitle: "Working Section",
  workingSectionSubtitle:
    "Set working days, working hours, and default holiday",

  // Label untuk form field
  workingDaysLabel: "Working Days",
  workingHoursLabel: "Working Hours",
  workingDurationLabel: "Working Duration",
  defaultHolidayLabel: "Default Holiday",

  // Label untuk opsi fleksibel dan waktu
  flexibleLabel: "Flexible",
  flexibleText: "Flexible",
  hoursLabel: "Hour(s)",

  // Label untuk default holiday
  useDefaultHolidayLabel: "Use Default Holiday?",
  yesText: "Yes",
  noText: "No",

  // Hari-hari dalam seminggu dan jam
  daysOfWeek: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  hours: Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  ),
};

export const titles = {
  successTitle: "Success",
  errorTitle: "Error",
};

export const defaults = {
  timeFormat: ":00",
  defaultRadius: "0",
};

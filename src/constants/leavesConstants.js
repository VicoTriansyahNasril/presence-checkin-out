import ICONS from "./iconConstants";

// Table columns configuration
export const TABLE_COLUMNS = [
  {
    field: "department",
    headerName: "Department",
    flex: 1,
    editTable: true,
  },
  {
    field: "employeeName",
    headerName: "Employee Name",
    flex: 2,
    editTable: true,
  },
  {
    field: "leaveType",
    headerName: "Leave Type",
    flex: 0.9,
  },
  {
    field: "leaveDuration",
    headerName: "Leave Duration",
    flex: 1.7,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 0.7,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 0.9,
    sortable: false,
  },
];

// Action buttons configuration
export const ACTION_BUTTONS = {
  ICON_VIEW: ICONS.VIEW,
  TOOLTIP_VIEW: "View Details",
  ICON_APPROVE: ICONS.TICK,
  TOOLTIP_APPROVE: "Approve Leave",
  ICON_REJECT: ICONS.REMOVE,
  TOOLTIP_REJECT: "Reject Leave",
};

export const STATUS = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export const FORMAT_DATE = "YYYY-MM-DD";

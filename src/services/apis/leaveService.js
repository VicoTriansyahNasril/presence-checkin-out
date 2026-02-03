import { mockLeaves, simulateDelay } from "../../data/mockData";
import dayjs from "dayjs";

export const getLeaves = async (page = 0, size = 10, keyword, startDate, endDate) => {
  await simulateDelay();

  let filtered = mockLeaves;

  if (startDate && endDate) {
    filtered = filtered.filter(l =>
      dayjs(l.start_date).isAfter(dayjs(startDate).subtract(1, 'day')) &&
      dayjs(l.end_date).isBefore(dayjs(endDate).add(1, 'day'))
    );
  }

  const start = page * size;
  const end = start + size;

  return {
    statusCode: 200,
    data: filtered.slice(start, end),
    totalData: filtered.length,
    totalPage: Math.ceil(filtered.length / size),
    pageSize: size
  };
};

export const getLeaveDetails = async (idLeave) => {
  await simulateDelay();
  const leave = mockLeaves.find(l => l.id_leave === parseInt(idLeave));
  return { statusCode: 200, data: leave };
};

export const changeStatusLeave = async (idLeave, status) => {
  await simulateDelay();
  const leave = mockLeaves.find(l => l.id_leave === parseInt(idLeave));
  if (leave) leave.status = status;
  return { statusCode: 200, data: leave };
};

export const exportLeave = async () => {
  await simulateDelay();
  // Simulate download
  const blob = new Blob([""], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "leaves.xlsx");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
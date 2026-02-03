import { mockHolidays, simulateDelay } from "../../data/mockData";

export const fetchHolidaysAPI = async (year, page, size) => {
  await simulateDelay();
  // Ignore year filter for simplicity in mock
  return {
    data: {
      data: {
        holidays: mockHolidays,
        totalElements: mockHolidays.length
      }
    }
  };
};

export const createHolidayAPI = async (holidayData) => {
  await simulateDelay();
  const newHoliday = { ...holidayData, id_holiday: Math.floor(Math.random() * 1000) };
  mockHolidays.push(newHoliday);
  return { data: newHoliday };
};
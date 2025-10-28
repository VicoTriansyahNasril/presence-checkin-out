// utils.js

// Function to decode department name
export const decodeDepartmentName = (name) => {
  return name.replace(/%([0-9A-F]{2})/g, (match, p1) =>
    String.fromCharCode("0x" + p1)
  );
};

// Function to get greeting based on time
export const getGreetingMessage = (hours) => {
  const adjustedHours = hours >= 24 ? hours - 24 : hours;

  if (adjustedHours >= 0 && adjustedHours < 11) {
    return "Good Morning!";
  } else if (adjustedHours >= 11 && adjustedHours < 14) {
    return "Good Afternoon!";
  } else if (adjustedHours >= 14 && adjustedHours < 18) {
    return "Good Evening!";
  } else {
    return "Good Night!";
  }
};

// Function to format date
export const getFormattedDate = (now) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return now.toLocaleDateString("en-US", options);
};

export const formatTime = (datetimeString) => {
  const date = new Date(datetimeString);
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: false, // Set to false for 24-hour format
  };
  return date.toLocaleTimeString("fa-IR", options);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    calender: "persian",
    month: "long",
    day: "numeric",
  };
  const persianDate = date.toLocaleTimeString("fa-IR", options);
  
  const parts = persianDate.split(' ');
  const result = parts.slice(0, 2).join(' ');

  return result;
};

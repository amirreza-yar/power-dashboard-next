const formatTime = (datetimeString) => {
  const date = new Date(datetimeString);
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: false, // Set to false for 24-hour format
  };
  return date.toLocaleTimeString("fa-IR", options);
};
export default formatTime;
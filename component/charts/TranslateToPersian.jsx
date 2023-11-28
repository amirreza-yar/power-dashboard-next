const translateDate = (date) => {
  if (date == "today") {
    return "امروز";
  } else if (date == "yesterday") {
    return "دیروز";
  } else if (date == "last7days") {
    return "۷ روز اخیر";
  }
};
export default translateDate;
const translateDate = (date) => {
  if (date == "today") {
    return "امروز";
  } else if (date == "yesterday") {
    return "دیروز";
  } else if (date == "last7days") {
    return "۷ روز اخیر";
  } else if (date == "last14days") {
    return "۱۴ روز اخیر"
  } else if (date == "thismonth") {
    return "ماه اخیر"
  } else if (date == "lastmonth") {
    return "ماه گذشته"
  }
};
export default translateDate;
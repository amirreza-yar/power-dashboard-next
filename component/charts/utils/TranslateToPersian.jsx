const translateDate = (date) => {
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (date == "today") {
    return "امروز";
  } else if (date == "yesterday") {
    return "دیروز";
  } else if (date == "last7days") {
    return "۷ روز اخیر";
  } else if (date == "last14days") {
    return "۱۴ روز اخیر";
  } else if (date == "thismonth") {
    return "ماه اخیر";
  } else if (date == "lastmonth") {
    return "ماه گذشته";
  } else if (date == "last30days") {
    return "۳۰ روز اخیر";
  } else if (dateFormatRegex.test(date)) {
    console.log(date);
    const perDate = new Date(date);
    const options = {
      calender: "persian",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const persianDate = perDate.toLocaleTimeString("fa-IR", options);
    const parts = persianDate.split(" ");
    const result = parts.slice(0, 2).join(" ");
    return result;
  }
};
export default translateDate;

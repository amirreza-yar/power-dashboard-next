const today = new Date();

const persianDate = today.toLocaleDateString("en-GB", {
  timeZone: "Asia/Tehran",
});
const persianToday = persianDate.split("/").reverse().join("-");

const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

// Format the yesterday date as a Persian date string
const yespersianDate = yesterday.toLocaleDateString("en-GB", {
  timeZone: "Asia/Tehran",
});
const persianYesterday = yespersianDate.split("/").reverse().join("-");

const translateDate = (date) => {
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (date == persianToday) {
    return "امروز";
  } else if (date == persianYesterday) {
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

export const transPerDate = (date) => {
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (dateFormatRegex.test(date)) {
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

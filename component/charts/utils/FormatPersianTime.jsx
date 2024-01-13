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

  const parts = persianDate.split(" ");
  const result = parts.slice(0, 2).join(" ");

  return result;
};

export function toPersianNumeral(number) {
  const persianNumerals = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const isNegative = number < 0;
  const absNumber = Math.abs(number);
  return (
    String(absNumber)
      .split("")
      .map((digit) => persianNumerals[digit])
      .join("") + (isNegative ? "-" : "")
  );
}

export function toPersianNumCost(number) {
  const persianNumerals = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const isNegative = number < 0;
  const absNumber = Math.abs(number);
  const numString = String(absNumber);
  const decimalIndex = numString.indexOf(".");
  const integerPart =
    decimalIndex === -1 ? numString : numString.slice(0, decimalIndex);
  const decimalPart = decimalIndex === -1 ? "" : numString.slice(decimalIndex);

  const formattedIntegerPart = integerPart
    .split("")
    .map((digit) => persianNumerals[digit])
    .join("");

  return (
    formattedIntegerPart +
    (decimalIndex !== -1 ? "," + decimalPart : "") +
    (isNegative ? "-" : "")
  );
}

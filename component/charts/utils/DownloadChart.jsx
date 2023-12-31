import html2canvas from "html2canvas";
import { formatTime, toPersianNumeral } from "./FormatPersianTime";
import { transPerDate } from "./TranslateToPersian";

export const exportAsImage = async (element, imageFileName, padding = 10) => {
  const html = document.getElementsByTagName("html")[0];
  const body = document.getElementsByTagName("body")[0];
  const datePicker = document.getElementById("datePickerInlineButton");

  datePicker.classList.add("hidden");

  // Calculate the new widths with padding
  const htmlWidth = html.clientWidth + 2 * padding;
  const bodyWidth = body.clientWidth + 2 * padding;

  // Set the new widths to include padding
  html.style.width = htmlWidth + "px";
  body.style.width = bodyWidth + "px";

  // Set padding for the element
  element.style.paddingLeft = padding + "px";
  element.style.paddingRight = padding + "px";

  // Capture the element as an image using html2canvas
  const canvas = await html2canvas(element);

  // Convert the canvas to a PNG image and download it
  const image = canvas.toDataURL("image/png", 1.0);
  downloadBlob(image, imageFileName);

  // Reset styles
  html.style.width = null;
  body.style.width = null;
  element.style.paddingLeft = null;
  element.style.paddingRight = null;
  datePicker.classList.remove("hidden");
};

const downloadBlob = (blob, fileName) => {
  const fakeLink = window.document.createElement("a");
  fakeLink.style = "display:none;";
  fakeLink.download = fileName;

  fakeLink.href = blob;

  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);

  fakeLink.remove();
};

export const exportAsCSV = (jsonData, fileName) => {
  const modifiedData = modifyKeys(jsonData);

  // Convert each row of the "مصرف ساعتی" array to a CSV row
  const csvRows = modifiedData["مصرف ساعتی"].map((item, index) => {
    if (index === 0) {
      return `"${formatTime(item.hour)} > ${item.power}","${
        modifiedData["تاریخ"]
      }","${modifiedData["کمترین توان مصرفی"]}","${
        modifiedData["بیشترین توان مصرفی"]
      }","${modifiedData["میانگین توان مصرفی"]}","${modifiedData["مصرف"]}"`;
    } else {
      return `"${formatTime(item.hour)} > ${
        item.power + "W"
      }","\n","\n","\n","\n","\n"`;
    }
  });

  // Add headers to the CSV string
  csvRows.unshift(
    '"مصرف ساعتی","تاریخ","کمترین توان مصرفی","بیشترین توان مصرفی","میانگین توان مصرفی","مصرف"'
  ); // Header for keys and values
  const csv = csvRows.join("\n");

  // Combine all rows into a single CSV string
  downloadCsv(csv, fileName);
};

function modifyKeys(data) {
  return {
    "کمترین توان مصرفی": Math.floor(data.min_power) + 'W',
    "بیشترین توان مصرفی": Math.floor(data.max_power) + 'W',
    "میانگین توان مصرفی": Math.floor(data.avg_power) + 'W',
    مصرف: Math.floor(data.energy) + 'Wh',
    تاریخ: transPerDate(data.date),
    "مصرف ساعتی": data.powers.map((item) => ({
      power: Math.floor(item.power),
      hour: item.hour,
    })),
  };
}

function downloadCsv(csvData, fileName = "data.csv") {
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

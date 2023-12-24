import html2canvas from "html2canvas";

export const exportAsImage = async (element, imageFileName, padding = 10) => {
  const html = document.getElementsByTagName("html")[0];
  const body = document.getElementsByTagName("body")[0];

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
  downloadImage(image, imageFileName);

  // Reset styles
  html.style.width = null;
  body.style.width = null;
  element.style.paddingLeft = null;
  element.style.paddingRight = null;
};

const downloadImage = (blob, fileName) => {
  const fakeLink = window.document.createElement("a");
  fakeLink.style = "display:none;";
  fakeLink.download = fileName;

  fakeLink.href = blob;

  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);

  fakeLink.remove();
};

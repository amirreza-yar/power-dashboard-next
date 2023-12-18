import "@public/styles/globals.css";

export const metadata = {
  title: "پنل کنتور هوشمند",
  description: "دکتر گیتی‌زاده، توسعه و طراحی توسط امیررضا یاراحمدی",
};

export default function RootLayout({ children }) {
  return (
    <html id="html" lang="en" dir="rtl">
      <body>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.1.1/flowbite.min.js" async></script>
        {/* <script src="https://cdn.jsdelivr.net/npm/apexcharts" defer></script> */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.44.0/apexcharts.min.js"></script>
        <script src="js/apexchart.js" defer></script>
        <script src="js/flowbite.min.js" defer></script>
        {children}
      </body>
    </html>
  );
}

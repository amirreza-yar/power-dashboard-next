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
        <script src="https://cdn.jsdelivr.net/npm/apexcharts" defer></script>
        {children}
      </body>
    </html>
  );
}

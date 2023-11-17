import './globals.css'


export const metadata = {
  title: 'پنل کنتور هوشمند',
  description: 'دکتر گیتی‌زاده، توسعه و طراحی توسط امیررضا یاراحمدی',
}

export default function RootLayout({ children }) {
  return (
    <html id='html' lang="en" dir="rtl">
      <body>
        {children}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.1.1/flowbite.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
      </body>
    </html>
  )
}

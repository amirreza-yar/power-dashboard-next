export default function loadPowerChart(currentData, timeData) {
  const createChart = () => {
    console.log("Data inside the loadApexCharts: " + currentData);
    const options = {
      chart: {
        height: "400px",
        maxWidth: "100%",
        type: "area",
        fontFamily: "iranyekan, sans-serif",
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: true,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: "#1C64F2",
          gradientToColors: ["#1C64F2"],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 6,
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 15,
          right: 2,
          top: 0,
        },
      },
      series: [
        {
          name: "مصرف",
          // data: [6500, 6418, 6456, 6526, 6356, 6456],
          data: currentData,
          color: "#1A56DB",
        },
      ],
      xaxis: {
        // categories: ["۱۲:۰۰", "۱۳:۰۰", "۱۴:۰۰", "۱۵:۰۰", "۱۶:۰۰", "۱۷:۰۰"],
        categories: timeData,
        labels: {
          show: true,
          style: {
            fontFamily: "iranyekan, sans-serif",
            fill: "#627bff",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
    };

    // console.log("I'm rendering!");
    const chart = new ApexCharts(
      document.getElementById("area-chart"),
      options
    );

    return chart;
  };

  if (typeof ApexCharts !== "undefined") {
    return createChart();
  } else {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/apexcharts";
    script.async = true;
    document.head.appendChild(script);
    return createChart();
  }
}

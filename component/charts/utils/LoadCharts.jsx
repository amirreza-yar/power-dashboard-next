const createPowerChart = (currentData, timeData) => {
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

  const chart = new ApexCharts(document.getElementById("area-chart"), options);

  return chart;
};

export function loadPowerChart(currentData, timeData, chart_id) {
  if (typeof ApexCharts !== "undefined") {
    return createPowerChart(currentData, timeData, chart_id);
  } else {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/apexcharts";
    script.async = true;
    script.onload = loadPowerChart(currentData, timeData, chart_id);
    document.head.appendChild(script);
    // return createChart(currentData, timeData, chart_id);
  }
}

const createColChart = () => {
  const options = {
    colors: ["#1A56DB", "#FDBA8C"],
    series: [
      {
        name: "بیشترین مصرف",
        color: "#1A56DB",
        data: [0]
      },
      {
        name: "کمترین مصرف",
        color: "#FDBA8C",
        data: [0]
      },
    ],
    chart: {
      type: "bar",
      height: "320px",
      fontFamily: "iranyekan, sans-serif",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
        borderRadiusApplication: "end",
        borderRadius: 8,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      style: {
        fontFamily: "iranyekan, sans-serif",
      },
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 1,
        },
      },
    },
    stroke: {
      show: true,
      width: 0,
      colors: ["transparent"],
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -14,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      floating: false,
      labels: {
        show: true,
        style: {
          fontFamily: "iranyekan, sans-serif",
          fill: "#627bff",
          direction: "rtl",
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
    fill: {
      opacity: 1,
    },
  };

  const chart = new ApexCharts(document.getElementById("column-chart"), options);
  return chart;
};

export function loadColChart(min_data, max_data) {
  if (typeof ApexCharts !== "undefined") {
    return createColChart(min_data, max_data);
  } else {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/apexcharts";
    script.async = true;
    script.onload = loadColChart(currentData, timeData, chart_id);
    document.head.appendChild(script);
    // return createChart(currentData, timeData, chart_id);
  }
}

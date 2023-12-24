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
      zoom: {
        autoScaleYaxis: true,
      },
      toolbar: {
        show: true,
        offsetX: -10,
        offsetY: 30,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
          customIcons: [],
        },
        export: {
          csv: {
            filename: undefined,
            columnDelimiter: ",",
            headerCategory: "category",
            headerValue: "value",
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
          },
          svg: {
            filename: undefined,
          },
          png: {
            filename: undefined,
          },
        },
        autoSelected: "zoom",
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
      style: {
        fontFamily: "iranyekan, sans-serif",
        fill: "#627bff",
        cssClass: "rtl",
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
        name: "توان مصرف",
        // data: [6500, 6418, 6456, 6526, 6356, 6456],
        data: currentData,
        color: "#1A56DB",
        style: {
          fontFamily: "iranyekan, sans-serif",
          fill: "#627bff",
          cssClass: "font-bold",
        },
      },
    ],
    xaxis: {
      categories: timeData,
      labels: {
        color: "#627bff",
        show: true,
        offsetX: 4,
        style: {
          fontFamily: "iranyekan, sans-serif",
          cssClass: "font-bold",
          colors: ["#7769f5", "#7769f5"],
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
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
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.44.0/apexcharts.min.js";
    script.async = true;
    document.head.appendChild(script);
    script.onload = createPowerChart(currentData, timeData, chart_id);
    // return createChart(currentData, timeData, chart_id);
  }
}

const createPieChart = () => {
  const options = {
    series: [35.1, 23.5, 2.4, 5.4],
    colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694"],
    chart: {
      height: 320,
      width: "100%",
      type: "donut",
    },
    stroke: {
      colors: ["transparent"],
      lineCap: "",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontFamily: "Inter, sans-serif",
              offsetY: 20,
            },
            total: {
              showAlways: true,
              show: true,
              label: "Unique visitors",
              fontFamily: "Inter, sans-serif",
              formatter: function (w) {
                const sum = w.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0);
                return `${sum}k`;
              },
            },
            value: {
              show: true,
              fontFamily: "Inter, sans-serif",
              offsetY: -20,
              formatter: function (value) {
                return value + "k";
              },
            },
          },
          size: "80%",
        },
      },
    },
    grid: {
      padding: {
        top: -2,
      },
    },
    labels: ["Direct", "Sponsor", "Affiliate", "Email marketing"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value + "k";
        },
      },
    },
    xaxis: {
      labels: {
        formatter: function (value) {
          return value + "k";
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
  };

  const chart = new ApexCharts(
    document.getElementById("pie-chart"),
    options
  );
  return chart;
};

export function loadPieChart(min_data, max_data) {
  if (typeof ApexCharts !== "undefined") {
    return createColChart(min_data, max_data);
  } else {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.44.0/apexcharts.min.js";
    script.async = true;
    document.head.appendChild(script);
    script.onload = createColChart(min_data, max_data);
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
        data: [0],
      },
      {
        name: "کمترین مصرف",
        color: "#FDBA8C",
        data: [0],
      },
    ],
    chart: {
      type: "bar",
      height: "320px",
      fontFamily: "iranyekan, sans-serif",
      toolbar: {
        show: false,
      },
      zoom: {
        autoScaleYaxis: true,
      },
      toolbar: {
        show: true,
        offsetX: -10,
        offsetY: 30,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
          customIcons: [],
        },
        export: {
          csv: {
            filename: undefined,
            columnDelimiter: ",",
            headerCategory: "category",
            headerValue: "value",
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
          },
          svg: {
            filename: undefined,
          },
          png: {
            filename: undefined,
          },
        },
        autoSelected: "zoom",
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
          cssClass: "text-xs font-bold",
          colors: ["#7769f5", "#7769f5"],
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

  const chart = new ApexCharts(
    document.getElementById("column-chart"),
    options
  );
  return chart;
};

export function loadColChart(min_data, max_data) {
  if (typeof ApexCharts !== "undefined") {
    return createColChart(min_data, max_data);
  } else {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.44.0/apexcharts.min.js";
    script.async = true;
    document.head.appendChild(script);
    script.onload = createColChart(min_data, max_data);
    // return createChart(currentData, timeData, chart_id);
  }
}

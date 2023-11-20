"use client";
import { useEffect, useState } from "react";

export default function PowerChart() {
  let isChart = false;
  useEffect(() => {
    // ApexCharts options and config
    let options = {
      chart: {
        height: "100%",
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
          left: 2,
          right: 2,
          top: 0,
        },
      },
      series: [
        {
          name: "مصرف",
          data: [6500, 6418, 6456, 6526, 6356, 6456],
          color: "#1A56DB",
        },
      ],
      xaxis: {
        categories: [
          "۱۲:۰۰",
          "۱۳:۰۰",
          "۱۴:۰۰",
          "۱۵:۰۰",
          "۱۶:۰۰",
          "۱۷:۰۰",
          "۱۸:۰۰",
        ],
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

    const loadApexCharts = () => {
      if (typeof ApexCharts !== "undefined") {
        const chart = new ApexCharts(
          document.getElementById("area-chart"),
          options
        );
        chart.render();
      }
    };

    // Check if ApexCharts is already loaded
    if (typeof ApexCharts !== "undefined") {
      loadApexCharts();
    } else {
      // If not loaded, wait for the script to load
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/apexcharts";
      script.async = true;
      script.onload = loadApexCharts;
      document.head.appendChild(script);
    }
  }, []);

  return <div id="area-chart" dir="ltr" />;
}

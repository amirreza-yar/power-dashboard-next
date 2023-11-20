"use client";
import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";

export default function ColPowerChart() {
  const [loading, setLoading] = useState(true);
  let isChart = false;
  useEffect(() => {
    if (isChart) {
    } else {
      const options = {
        colors: ["#1A56DB", "#FDBA8C"],
        series: [
          {
            name: "بیشترین مصرف",
            color: "#1A56DB",
            data: [
              { x: "شنبه", y: 231 },
              { x: "یکشنبه", y: 122 },
              { x: "دوشنبه", y: 63 },
              { x: "سه‌شنبه", y: 421 },
              { x: "چهارشنبه", y: 122 },
              { x: "پنجشنبه", y: 323 },
              { x: "جمعه", y: 111 },
            ],
          },
          {
            name: "کمترین مصرف",
            color: "#FDBA8C",
            data: [
              { x: "شنبه", y: 232 },
              { x: "یکشنبه", y: 113 },
              { x: "دوشنبه", y: 341 },
              { x: "سه‌شنبه", y: 224 },
              { x: "چهارشنبه", y: 522 },
              { x: "پنجشنبه", y: 411 },
              { x: "جمعه", y: 243 },
            ],
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

      const loadApexCharts = () => {
        if (typeof ApexCharts !== "undefined") {
          setLoading(false);
          const chart = new ApexCharts(
            document.getElementById("column-chart"),
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
    }
  }, []);

  return (
    <>
      {loading && (
        <div className="text-center" style={{ margin: "150px" }}>
          <div className="text-center">
            <Spinner aria-label="Power chart loader" size="xl" color="purple" />
          </div>
        </div>
      )}
      <div id="column-chart" dir="ltr" />
    </>
  );
}

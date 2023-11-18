"use client";
import { useEffect } from "react";

export default function ColPowerChart() {
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
          fontFamily: "Yekan, sans-serif",
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
            fontFamily: "Yekan, sans-serif",
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
              fontFamily: "Yekan, sans-serif",
              fill: "blue",
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

      if (
        document.getElementById("column-chart") &&
        typeof ApexCharts !== "undefined"
      ) {
        const chart = new ApexCharts(
          document.getElementById("column-chart"),
          options
        );
        chart.render();
      }
    }
  }, []);

  return (
    <div className="w-full max-h-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 mt-4">
      <div className="flex justify-between">
        <div>
          <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white py-3 font-bold">
            مصرف چند روز اخیر
          </h5>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            بیشترین و کمترین میزان مصرف هر روز
          </p>
        </div>
        {/* <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-red-500 dark:text-red-500 text-center font-bold">
          ۱۲٪
          <svg
            className="w-3 h-3 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13V1m0 0L1 5m4-4 4 4"
            />
          </svg>
        </div> */}
      </div>
      <div id="column-chart" dir="ltr" />
      <div className="items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex justify-between items-center pt-5">
          {/* Button */}
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="lastDaysdropdown"
            data-dropdown-placement="bottom"
            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
            type="button"
          >
            مصرف امروز
            <svg
              className="w-3 m-3 mr-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {/* Dropdown menu */}
          <div
            id="lastDaysdropdown"
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  دیروز
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  امروز
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  ۷ روز اخیر
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  ۱ ماه اخیر
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  ۳ ماه اخیر
                </a>
              </li>
            </ul>
          </div>
          <a
            href="#"
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-indigo-500 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2"
          >
            دریافت گزارش
            <svg
              className="w-3 h-3 mr-2 rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
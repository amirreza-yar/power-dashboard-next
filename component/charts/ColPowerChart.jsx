"use client";
import { useEffect, useState, useRef } from "react";
import { Spinner } from "flowbite-react";
import { loadColChart } from "./utils/LoadCharts";
import { formatDate } from "./utils/FormatPersianTime";
import translateDate from "./utils/TranslateToPersian";

export default function PowerChart() {
  const [loading, setLoading] = useState(true);
  const [columnData, setColumnData] = useState(null);
  const [chart, setChart] = useState(null);
  const [chartDate, setChartDate] = useState("last7days");

  const loadChart = async () => {
    try {
      let apiUrl =
        "http://rcpss-sutech.ir/django/min-max-power/?date=" + chartDate;

      const response = await fetch(apiUrl);
      const data = await response.json();

      setColumnData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (chart === null) {
      setChart(loadColChart([0], [0]));
    }
    if (chartDate !== null && columnData === null) {
      loadChart();
    }
    if (columnData !== null && chart !== null) {
      const timeData = columnData.map((item) => formatDate(item.date));
      const minPowerDataRaw = columnData.map((item) => item.min_power);
      const maxPowerDataRaw = columnData.map((item) => item.max_power);

      const minPowerData = timeData.map((time, index) => ({
        x: time,
        y: Math.floor(minPowerDataRaw[index]),
      }));

      const maxPowerData = timeData.map((time, index) => ({
        x: time,
        y: Math.floor(maxPowerDataRaw[index]),
      }));


      setLoading(false);
      chart.render();

      chart.updateOptions({
        series: [
          {
            data: maxPowerData,
          },
          {
            data: minPowerData,
          },
        ],
        xaxis: {
          labels: {
            style: {
              colors: Array(timeData.length).fill('#6875f5'),
            }
          },
        },
      });
    }
  }, [columnData]);

  return (
    <>
      <div className="w-full max-h-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 mt-4">
        <div className="flex justify-between">
          <div>
            <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-2 font-bold">
              ۴۳۶w
            </h5>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              بیشترین و کمترین مصرف {translateDate(chartDate)}
              {loading == 2 && (
                <Spinner
                  className="mr-2"
                  aria-label="Power chart loader"
                  size="sm"
                  color="purple"
                />
              )}
            </p>
          </div>
          <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-red-500 dark:text-red-500 text-center font-bold">
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
          </div>
        </div>

        {/* Power chart here */}
        {loading == true && (
          <div className="text-center" style={{ margin: "150px" }}>
            <div className="text-center">
              <Spinner
                aria-label="Power chart loader"
                size="xl"
                color="purple"
              />
            </div>
          </div>
        )}
        <div id="column-chart" dir="ltr" />

        <div className="items-center border-gray-200 border-t dark:border-gray-700 justify-between">
          <div className="flex justify-between items-center pt-5">
            {/* Button */}
            <button
              id="ColumnDaysDefaultButton"
              data-dropdown-toggle="lastDayscolumn"
              data-dropdown-placement="bottom"
              className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
              type="button"
            >
              مصرف {translateDate(chartDate)}
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
              id="lastDayscolumn"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="ColumnDaysDefaultButton"
              >
                <li className={chartDate == "last7days" ? "hidden" : ""}>
                  <a
                    onClick={() => {
                      setChartDate("last7days");
                      setColumnData(null);
                      setLoading(2);
                    }}
                    className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    ۷ روز اخیر
                  </a>
                </li>
                <li className={chartDate == "last14days" ? "hidden" : ""}>
                  <a
                    onClick={() => {
                      setChartDate("last14days");
                      setColumnData(null);
                      setLoading(2);
                    }}
                    className="cursor-pointer block cursor-point px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    ۱۴ روز اخیر
                  </a>
                </li>
                <li className={chartDate == "last30days" ? "hidden" : ""}>
                  <a
                    onClick={() => {
                      setChartDate("last30days");
                      setColumnData(null);
                      setLoading(2);
                    }}
                    className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    ۳۰ روز اخیر
                  </a>
                </li>
                {/* <li>
                  <a
                    href="#"
                    className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    ۱ ماه اخیر
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="cursor-pointerblock px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    ۳ ماه اخیر
                  </a>
                </li> */}
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
    </>
  );
}

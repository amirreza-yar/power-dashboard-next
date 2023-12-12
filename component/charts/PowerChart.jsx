"use client";
import { useEffect, useState, useRef } from "react";
import { Spinner, theme } from "flowbite-react";
import { loadPowerChart } from "./utils/LoadCharts";
import { formatTime, formatDate } from "./utils/FormatPersianTime";
import translateDate from "./utils/TranslateToPersian";
import { Datepicker } from "flowbite-react";

export default function PowerChart() {
  const [loading, setLoading] = useState(true);
  const [powerData, setPowerData] = useState(null);
  const [chart, setChart] = useState(null);
  const [chartDate, setChartDate] = useState("today");
  const [maxAllowedCons, setMaxAllowedCons] = useState(450);

  Array.prototype.max = function () {
    return Math.max.apply(null, this);
  };

  Array.prototype.min = function () {
    return Math.min.apply(null, this);
  };

  const loadChart = async () => {
    try {
      let apiUrl = `http://rcpss-sutech.ir/django/${
        chartDate === "last7days" ? "avg-power" : "power"
      }/?date=${chartDate}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      setPowerData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (chart === null) {
      setChart(loadPowerChart([0], [0]));
    }
    if (chartDate !== null && powerData === null) {
      // const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
      // if (dateFormatRegex.test(chartDate))
      loadChart();
    }
    if (powerData !== null && chart !== null && maxAllowedCons !== null) {
      const currentData = powerData.map((item) =>
        chartDate === "last7days"
          ? Math.floor(item.avg_power)
          : Math.floor(item.power)
      );
      const timeData = powerData.map((item) =>
        chartDate === "last7days"
          ? formatDate(item.date)
          : formatTime(item.datetime)
      );

      try {
        chart.render();
      } catch (error) {
        // console.log(error);
        chart.render();
      }

      setLoading(false);

      chart.updateOptions({
        series: [
          {
            data: currentData,
            color: currentData.max() >= maxAllowedCons ? "#db1a1a" : "#1adb51",
            style: {
              fontFamily: "iranyekan, sans-serif",
              fill: currentData.max() >= maxAllowedCons ? "#ff6262" : "#65ff62",
              cssClass: "font-bold",
            },
          },
        ],
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.55,
            opacityTo: 0,
            shade: currentData.max() >= maxAllowedCons ? "#f21c1c" : "#1cf26e",
            gradientToColors:
              currentData.max() >= maxAllowedCons ? ["#f21c1c"] : ["#1cf26e"],
          },
        },
        xaxis: {
          tickAmount: 12,
          categories: timeData,
          labels: {
            style: {
              colors: Array(timeData.length).fill("#6875f5"),
            },
          },
        },
        yaxis: {
          labels: {
            color: "#627bff",
            show: currentData.length === 0 ? false : true,
            style: {
              fontFamily: "iranyekan, sans-serif",
              cssClass: "font-bold",
              colors: ["#7769f5", "#7769f5"],
            },
            formatter: (val) => {
              return val + "w";
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        noData: {
          text: `داده‌ای برای ${translateDate(chartDate)} وجود ندارد`,
          align: "center",
          verticalAlign: "middle",
          offsetX: 0,
          offsetY: 0,
          style: {
            color: "#6875f5",
            fontSize: "14px",
            fontFamily: undefined,
          },
        },
        grid: {
          show: currentData.length === 0 ? false : true,
          borderColor: "#90A4AE",
        },
        annotations: {
          yaxis: [
            {
              y: maxAllowedCons,
              borderColor: "#6875f5",
              label: {
                borderColor: null,
                style: {
                  color: "#fff",
                  background: "#6875f5",
                },
                text: "حد مجاز مصرف",
              },
            },
          ],
        },
      });
    }
  }, [powerData]);

  return (
    <>
      <div className="w-full max-h-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 ">
        <div className="flex justify-between">
          <div>
            <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-2 font-bold">
              ۴۳۶w (DEV)
            </h5>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              توان مصرفی {translateDate(chartDate)}
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

          <button
            type="button"
            id="datePickerInlineButton"
            data-dropdown-toggle="datePickerInline"
            data-dropdown-placement="right-end"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-0 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="h-5 w-5 text-gray-500 dark:text-gray-400"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
          </button>

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
          <div id="datePickerInline" className="hidden z-50" dir="ltr">
            <Datepicker
              // theme={datePickerTheme}
              // dir="rtl"

              language="fa-IR"
              labelTodayButton="امروز"
              labelClearButton="پاک کردن"
              // maxDate={new Date(new Date().setDate(new Date().getDate() + 1))}
              maxDate={new Date()}
              weekStart={0}
              autoHide={true}
              inline
              onSelectedDateChanged={(date) => {
                const persianDate = date.toLocaleDateString("en-GB", {
                  timeZone: "Asia/Tehran",
                });
                const formattedDate = persianDate
                  .split("/")
                  .reverse()
                  .join("-");
                // const formattedDate = `${year}-${month}-${day}`;
                document.getElementById("datePickerInlineButton").click();
                // datePickerInline.classList.remove('block');
                // datePickerInline.classList.add('hidden');
                setChartDate(formattedDate);
                setPowerData(null);
                setLoading(2);
              }}
            />
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
        {/* <div className="absolute z-50">
          <div className="flex justify-center items-center pt-5">
            <span dir="rtl">دیتایی برای نمایش وجود ندارد!</span>
          </div>
        </div> */}
        <div id="area-chart" dir="ltr"></div>

        <div className="items-center border-gray-200 border-t dark:border-gray-700 justify-between">
          <div className="flex justify-between items-center pt-5">
            {/* <Datepicker language="fa-IR" labelTodayButton="امروز" labelClearButton="پاک کردن" maxDate={new Date()} weekStart={0} /> */}
            {/* Button */}
            <button
              id="LineDefaultButton"
              data-dropdown-toggle="lastDaysLine"
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
              id="lastDaysLine"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="LineDefaultButton"
              >
                <li className={chartDate == "today" ? "hidden" : ""}>
                  <a
                    onClick={() => {
                      setChartDate("today");
                      setPowerData(null);
                      setLoading(2);
                    }}
                    className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    امروز
                  </a>
                </li>
                <li className={chartDate == "yesterday" ? "hidden" : ""}>
                  <a
                    onClick={() => {
                      setChartDate("yesterday");
                      setPowerData(null);
                      setLoading(2);
                    }}
                    className="cursor-pointer block cursor-point px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    دیروز
                  </a>
                </li>
                <li className={chartDate == "last7days" ? "hidden" : ""}>
                  <a
                    onClick={() => {
                      setChartDate("last7days");
                      setPowerData(null);
                      setLoading(2);
                    }}
                    className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    ۷ روز اخیر
                  </a>
                </li>
                {/* <li>
                  <button
                    // id="datePickerInlineButton"
                    // data-dropdown-toggle="datePickerInline"
                    // data-dropdown-placement="right-end"
                    // onClick={() => {
                    //   setDatePicker(!datePicker);
                    // }}
                    className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    انتخاب تاریخ
                  </button>
                </li> */}
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
            <button
              disabled
              href="#"
              className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-indigo-500 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2"
            >
              دریافت گزارش (DEV)
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
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

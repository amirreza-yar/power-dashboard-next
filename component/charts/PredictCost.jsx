"use client";
import { useEffect, useState } from "react";
import { Spinner, theme } from "flowbite-react";
import { loadRadialChart } from "./utils/LoadCharts";
import { transPerDate } from "./utils/TranslateToPersian";
import translateDate from "./utils/TranslateToPersian";
import { toPersianNumeral } from "./utils/FormatPersianTime";

export default function PredictCost({ changeRate, energy }) {
  const [loading, setLoading] = useState(true);
  const [radialChart, setRadialChart] = useState(null);

  Array.prototype.max = function () {
    return Math.max.apply(null, this);
  };

  Array.prototype.min = function () {
    return Math.min.apply(null, this);
  };

  useEffect(() => {
    if (radialChart === null) {
      const test = loadRadialChart();
      console.log(test);
      setRadialChart(loadRadialChart());
    }

    if (radialChart !== null && changeRate !== null && energy !== null) {
      console.log("chart rendering...");
      console.log(radialChart);
      try {
        radialChart.render();
        setLoading(false);
        // document.querySelector('.apexcharts-menu-icon').classList.add('hidden');
      } catch (error) {
        // console.log(error);
        radialChart.render();
        // document.querySelector('.apexcharts-menu-icon').classList.add('hidden');
      }
      radialChart.updateOptions({
        series: [Math.abs(changeRate)],
        colors: [changeRate <= -15 ? "#16BDCA" : (changeRate > 0 ? "#fa3737" : "#FDBA8C")],
        plotOptions: {
          radialBar: {
            dataLabels: {
              value: {
                color: changeRate <= -15 ? "#16BDCA" : (changeRate > 0 ? "#fa3737" : "#FDBA8C"),
              },
            },
          },
        },
        labels: [changeRate <= -15 ? "مصرف پایین" : (changeRate > 0 ? "مصرف زیاد" : "مصرف معمول")],
      });

      setLoading(false);
    }
  }, [radialChart, energy]);

  return (
    <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 mt-5">
      <div>
        <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-2 font-bold">
          {toPersianNumeral(Math.floor(energy / 100))}
          <span className="text-base mr-1">هزارتومان</span>
        </h5>
        <div className="flex items-center">
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            تحلیل مصرف
            {loading == 2 && (
              <Spinner
                className="mr-2"
                aria-label="Power chart loader"
                size="sm"
                color="purple"
              />
            )}
          </p>
          <svg
            data-popover-target="radial-chart-info"
            data-popover-placement="bottom"
            className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer mr-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z" />
          </svg>
          <div
            data-popover=""
            id="radial-chart-info"
            role="tooltip"
            style={{ width: "200px" }}
            className="absolute z-50 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
          >
            <div className="p-2 space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                تحلیل مصرف شما
              </h3>
              <p>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است
              </p>
              <a
                href="#"
                className="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline"
              >
                اطلاعات بیشتر{" "}
                <svg
                  className="w-2 h-2 mr-1 rotate-180"
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
            <div data-popper-arrow="" />
          </div>
        </div>
      </div>
      <div className="flex justify-between mb-3"></div>
      {/* Radial Chart */}
      <div
        style={{ fontFamily: "iranyekan, sans-serif !important" }}
        className="py-6"
        id="radial-chart"
      />
      {/* <div className="flex justify-center">میزان خوش مصرفی</div> */}
    </div>
  );
}
"use client";
import { useEffect, useState } from "react";
import { Spinner, theme } from "flowbite-react";
import { loadPieChart } from "./utils/LoadCharts";
import { transPerDate } from "./utils/TranslateToPersian";
import translateDate from "./utils/TranslateToPersian";
import { Tooltip } from "flowbite-react";
import {
  formatTime,
  formatDate,
  toPersianNumeral,
} from "./utils/FormatPersianTime";

const calculateEnergy = (powers) => {
  const hourlyEnergies = [];

  for (let i = 0; i < powers.length - 1; i++) {
    const startTime = new Date(powers[i].hour);
    const endTime = new Date(powers[i + 1].hour);

    // Calculate the time difference in milliseconds
    const timeDiff = endTime - startTime;

    // Calculate the midpoint time
    const midpointTime = new Date(startTime.getTime() + timeDiff / 2);

    // Calculate energy for the interval
    const energy =
      ((powers[i].power + powers[i + 1].power) / 2) * (timeDiff / 3600000); // Convert milliseconds to hours

    hourlyEnergies.push({
      time: `${String(midpointTime.getHours()).padStart(2, "0")}:${String(
        midpointTime.getMinutes()
      ).padStart(2, "0")}`,
      energy: energy,
    });
  }

  return hourlyEnergies;
};

function calculateSumOfEnergies(hourlyEnergies) {
  const sums = {
    firstInterval: 0, // 0:0 to 7:0
    secondInterval: 0, // 7:0 to 19:0
    thirdInterval: 0, // 19:0 to 23:0
  };

  hourlyEnergies.forEach((entry) => {
    const [hour] = entry.time.split(":");
    const hourValue = parseInt(hour, 10);
    const energy = entry.energy; // Assuming the energy value is stored in a property called 'energy'

    if (hourValue >= 0 && hourValue < 7) {
      sums.firstInterval += energy;
    } else if (hourValue >= 7 && hourValue < 19) {
      sums.secondInterval += energy;
    } else if (hourValue >= 19 && hourValue <= 23) {
      sums.thirdInterval += energy;
    }
  });

  return sums;
}

export default function PieChart({ chartDate, powers }) {
  const [loading, setLoading] = useState(true);
  const [pieChart, setPieChart] = useState(null);
  const [energyInt, setEnergyInt] = useState(null);

  Array.prototype.max = function () {
    return Math.max.apply(null, this);
  };

  Array.prototype.min = function () {
    return Math.min.apply(null, this);
  };

  useEffect(() => {
    if (pieChart === null) {
      setPieChart(loadPieChart());
    }

    if (
      pieChart !== null &&
      chartDate !== null &&
      powers !== null &&
      powers !== undefined
    ) {
      const energyRanges = calculateSumOfEnergies(calculateEnergy(powers));

      setEnergyInt(energyRanges);

      try {
        pieChart.render();
        setLoading(false);
        // document.querySelector('.apexcharts-menu-icon').classList.add('hidden');
      } catch (error) {
        // console.log(error);
        pieChart.render();
        // document.querySelector('.apexcharts-menu-icon').classList.add('hidden');
      }

      pieChart.updateOptions({
        series: [
          Math.floor(energyRanges.firstInterval),
          Math.floor(energyRanges.secondInterval),
          Math.floor(energyRanges.thirdInterval),
        ],
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
        plotOptions: {
          pie: {
            donut: {
              labels: {
                total: {
                  label: `مصرف ${translateDate(chartDate)}`,
                },
              },
            },
          },
        },
        dataLabels: {
          formatter: function (val, opt) {
            return (
              toPersianNumeral(
                Math.floor(
                  (val / 100) *
                    (energyRanges.firstInterval +
                      energyRanges.secondInterval +
                      energyRanges.thirdInterval)
                )
              ) + "wh"
            );
          },
        },
      });

      setLoading(false);
    }
  }, [powers]);

  const tooltipTheme = {
    target: "w-fit",
    animation: "transition-opacity",
    arrow: {
      base: "absolute z-50 h-2 w-2 rotate-45",
      style: {
        dark: "bg-gray-900 dark:bg-gray-700",
        light: "bg-white",
        auto: "bg-white dark:bg-gray-700",
      },
      placement: "-4px",
    },
    base: "absolute inline-block z-50 rounded-lg py-2 px-3 text-sm font-medium shadow-sm",
    hidden: "invisible opacity-0",
    style: {
      dark: "bg-gray-900 text-white dark:bg-gray-700",
      light: "border border-gray-200 bg-white text-gray-900",
      auto: "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white",
    },
    content: "relative z-20",
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 mt-5">
        <div className="flex justify-between mb-3">
          <div className="flex justify-center items-center">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white p-1">
              میزان مصرف
            </h5>
            <Tooltip
              theme={tooltipTheme}
              content={
                <div
                  id="radial-chart-info"
                  role="tooltip"
                  style={{ width: "250px", zIndex: "10000px" }}
                  className="text-sm text-white"
                >
                  <div className="p-2 space-y-2">
                    <h3 className="font-semibold text-lg">
                      میزان مصرف {transPerDate(chartDate)}
                    </h3>
                    <p>
                      مصرف کم‌باری (۲۳ الی ۷){" "}
                      {toPersianNumeral(Math.floor(energyInt?.firstInterval)) +
                        "وات‌ساعت"}
                      <br />
                      مصرف میان‌باری (۷ الی ۱۹){" "}
                      {toPersianNumeral(Math.floor(energyInt?.secondInterval)) +
                        "وات‌ساعت"}
                      <br />
                      مصرف پرباری (۱۹ الی ۲۳){" "}
                      {toPersianNumeral(Math.floor(energyInt?.thirdInterval)) +
                        "وات‌ساعت"}
                    </p>
                  </div>
                  <div data-popper-arrow="" />
                </div>
              }
              animation="duration-300"
            >
              <svg
                className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer mr-1 mt-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z" />
              </svg>
            </Tooltip>
          </div>
        </div>

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

        {/* Donut Chart */}
        <div
          className="py-6 mt-5"
          id="pie-chart"
          dir="rtl"
          fontFamily="iranyekan, sans-serif"
        />
      </div>
    </>
  );
}

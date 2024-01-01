"use client";
import { useEffect, useState } from "react";
import { Spinner, theme } from "flowbite-react";
import { loadPieChart } from "./utils/LoadCharts";
import { transPerDate } from "./utils/TranslateToPersian";
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
      const lowRange = powers.filter((entry) => {
        const hour = new Date(entry.hour).getHours();
        return hour >= 0 && hour < 8;
      });

      const midRange = powers.filter((entry) => {
        const hour = new Date(entry.hour).getHours();
        return hour >= 7 && hour < 19;
      });

      const highRange = powers.filter((entry) => {
        const hour = new Date(entry.hour).getHours();
        return hour >= 19 && hour < 24;
      });

      console.log(powers);

      const energies = calculateEnergy(powers);
      const energyRanges = calculateSumOfEnergies(energies);
      console.log(energyRanges);

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
          energyRanges.firstInterval,
          energyRanges.secondInterval,
          energyRanges.thirdInterval,
        ],
      });

      setLoading(false);
    }
  }, [powers]);

  return (
    <>
      <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 mt-5">
        <div className="flex justify-between mb-3">
          <div className="flex justify-center items-center">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white p-1">
              میزان مصرف
            </h5>
            <svg
              data-popover-target="chart-info"
              data-popover-placement="bottom"
              className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z" />
            </svg>
            <div
              data-popover=""
              id="chart-info"
              role="tooltip"
              style={{ width: "200px" }}
              className="absolute z-50 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
            >
              <div className="p-2 space-y-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  میزان مصرف شما
                </h3>
                <p>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است
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
        <div className="py-6 mt-5" id="pie-chart" />
      </div>
    </>
  );
}

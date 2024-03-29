"use client";
import { useEffect, useState } from "react";
import { Spinner, Tooltip, theme } from "flowbite-react";
import { loadRadialChart } from "./utils/LoadCharts";
import { transPerDate } from "./utils/TranslateToPersian";
import translateDate from "./utils/TranslateToPersian";
import { toPersianNumCost, toPersianNumeral } from "./utils/FormatPersianTime";
import NumberCounter from "./utils/NumberCounter";
import Dropdown from "@component/helpers/Dropdown";

export default function PredictCost({
  changeRate,
  predictedCost,
  chartDate,
  minMaxData,
}) {
  const [loading, setLoading] = useState(true);
  const [radialChart, setRadialChart] = useState(null);

  Array.prototype.max = function () {
    return Math.max.apply(null, this);
  };

  Array.prototype.min = function () {
    return Math.min.apply(null, this);
  };

  return (
    <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 mt-5">
      <div>
        <h5 className="flex items-center leading-none text-2xl font-bold text-gray-900 dark:text-white pb-2 font-bold">
          {predictedCost}
          <span className="text-base mr-1">تومان</span>
          {/* {predictedCost === null && (
            <Spinner
              className="mr-2"
              aria-label="Power chart loader"
              size="sm"
              color="purple"
            />
          )} */}
          <Tooltip
            content={
              <div
                id="radial-chart-info"
                role="tooltip"
                style={{ width: "250px" }}
                className="text-sm text-white"
              >
                <div className="p-2 space-y-2">
                  <h3 className="font-semibold text-lg">
                    تحلیل مصرف {transPerDate(chartDate)}
                  </h3>
                  <p>
                    کمترین مصرف {toPersianNumeral(minMaxData?.minPower) + "وات"}{" "}
                    در ساعت {minMaxData?.minHour}
                    <br />
                    بیشترین مصرف{" "}
                    {toPersianNumeral(minMaxData?.maxPower) + "وات"} در ساعت{" "}
                    {minMaxData?.maxHour}
                    <br />
                    مشتری بر اساس تعرفه وزارت نیرو:{" "}
                    {changeRate <= -15
                      ? "کم مصرف"
                      : changeRate > 0
                      ? "پر مصرف"
                      : "مصرف مرزی"}
                    <br />
                    پتانسیل کاهش مصرف:{" "}
                    {changeRate > 0 ? `${toPersianNumeral(changeRate)}٪` : "-"}
                    <br />
                    هزینه برق با آخرین تعرفه ی وزارت نیرو بر حسب مصرف در تاریخ
                    جاری، با احتساب وقوع مصارف مشابه در روز های بعد تا یکماه،
                    تخمین زده شده است. درصد قابل کاهش در هزینه در صورت رعایت حد
                    مجاز.
                  </p>
                </div>
                <div data-popper-arrow="" />
              </div>
            }
            animation="duration-300"
          >
            <svg
              className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer mr-2 mt-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z" />
            </svg>
          </Tooltip>
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
          <div
            id="radial-chart-info"
            role="tooltip"
            style={{ width: "250px" }}
            className="absolute z-50 hidden inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
          >
            <div className="p-2 space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                تحلیل مصرف {transPerDate(chartDate)}
              </h3>
              <p>
                کمترین مصرف {toPersianNumeral(minMaxData?.minPower) + "وات"} در
                ساعت {minMaxData?.minHour}
                <br />
                بیشترین مصرف {toPersianNumeral(minMaxData?.maxPower) + "وات"} در
                ساعت {minMaxData?.maxHour}
                <br />
                مشتری بر اساس تعرفه وزارت نیرو:{" "}
                {changeRate <= -15
                  ? "کم مصرف"
                  : changeRate > 0
                  ? "پر مصرف"
                  : "مصرف مرزی"}
                <br />
                پتانسیل کاهش مصرف:{" "}
                {changeRate > 0 ? toPersianNumeral(changeRate) : "-"}
                <br />
                هزینه برق با آخرین تعرفه ی وزارت نیرو بر حسب مصرف در تاریخ جاری،
                با احتساب وقوع مصارف مشابه در روز های بعد تا یکماه، تخمین زده
                شده است. درصد قابل کاهش در هزینه در صورت رعایت حد مجاز.
              </p>
            </div>
            <div data-popper-arrow="" />
          </div>
        </div>
      </div>
      <div className="flex justify-between mb-3"></div>

      <div className="circle-container flex-col">
        <div
          className="circle flex flex-col justify-center items-center transition-all duration-500"
          style={{
            backgroundColor:
              changeRate <= -15
                ? "#16BDCA"
                : changeRate > 0
                ? "#fa3737"
                : "#FDBA8C",
          }}
        >
          <div className="text-2xl" style={{ color: "#444" }}>
            <NumberCounter targetNumber={Math.floor(Math.abs(changeRate))} />
          </div>
          <div className="" style={{ color: "#444" }}>
            {changeRate <= -15
              ? "کم مصرف"
              : changeRate > 0
              ? "پر مصرف"
              : "مصرف مرزی"}
          </div>
        </div>
      </div>
    </div>
  );
}

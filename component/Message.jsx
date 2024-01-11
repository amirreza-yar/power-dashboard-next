"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useMessage } from "@context/MessageContext";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import { IoMdInformation } from "react-icons/io";

const Message = () => {
  const { message, setMessage, mesStatus } = useMessage({ message: "", mesStatus: "" });

  const theme = {
    root: {
      base: "flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-900 dark:text-gray-400",
      closed: "opacity-0 ease-out",
    },
    toggle: {
      base: "-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white",
      icon: "h-5 w-5 shrink-0",
    },
  };

  useEffect(() => {
    console.log("Message is: ", message.message);
    console.log("Message status is: ", message.mesStatus);
  }, [message]);

  if (!message) return null;

  return (
    <>
      {(message?.mesStatus === "success") &&
      <div className="flex flex-col gap-4 absolute toast-container">
        <Toast dir="ltr" duration={75} theme={theme}>
          <Toast.Toggle />
          <div className="ml-3 mr-3 text-sm font-normal font-iranyekan">
            {message.message}
          </div>
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-900 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
        </Toast>
      </div>}
      
      {message?.mesStatus === "info" &&
      <div className="flex flex-col gap-4 absolute toast-container">
        <Toast dir="ltr" duration={75} theme={theme}>
          <Toast.Toggle />
          <div className="ml-3 mr-3 text-sm font-normal font-iranyekan">
            {message.message}
          </div>
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-900 dark:text-green-200">
            <IoMdInformation className="h-5 w-5" />
          </div>
        </Toast>
      </div>}
    </>
  );
};

export default Message;

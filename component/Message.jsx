"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useMessage } from "@context/MessageContext";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import { IoMdInformation } from "react-icons/io";

const Message = () => {
  const { message, showMessage } = useMessage();
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type) => {
    let icon;
    let theme;
    let style;

    switch (type) {
      case "success":
        icon = <HiCheck className="h-5 w-5" />;
        style =
          "bg-green-100 text-green-500 dark:bg-green-900 dark:text-green-200";
        break;
      case "error":
        icon = <HiX className="h-5 w-5" />;
        style = "bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-200";
        break;
      case "info":
        icon = <IoMdInformation className="h-5 w-5" />;
        style = "bg-yellow-100 text-yellow-500 dark:bg-yellow-900 dark:text-yellow-200";
        break;
      // Add more cases for other types if needed

      default:
        // Default to info style if type is not recognized
        icon = <HiExclamation className="h-5 w-5" />;
        style = "bg-blue-100";
        break;
    }

    theme = {
      root: {
        base: "flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-900 dark:text-gray-400",
        closed: "opacity-0 ease-out",
      },
      toggle: {
        base: "-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white",
        icon: "h-5 w-5 shrink-0",
      },
    };

    const newToast = (
      <>
        <Toast key={Date.now()} dir="ltr" duration={75} theme={theme}>
          <Toast.Toggle />
          <div dir="rtl" className={`ml-3 mr-3 text-sm font-normal font-iranyekan`}>
            {message}
          </div>
          <div
            className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${style}`}
          >
            {icon}
          </div>
        </Toast>
      </>
    );

    // Update state to include the new toast
    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  useEffect(() => {
    if (message.message !== undefined) {
      addToast(message.message, message.mesStatus);
    }
    console.log("Message is: ", message.message);
    console.log("Message status is: ", message.mesStatus);
  }, [message]);

  if (!message) return null;

  return (
    <>
      <div className="flex flex-col gap-4 absolute toast-container">
        {toasts.map((toast, index) => (
          <div key={index}>{toast}</div>
        ))}
      </div>
    </>
  );
};

export default Message;

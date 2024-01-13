"use client";
"use client";
import { useState, useEffect, useRef } from "react";

const Dropdown = ({ elementId, buttonId, buttonClassName, children, clickOutside=true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      handleClickOutside(event);
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const targetElement = document.getElementById(elementId);

    if (targetElement) {
      isOpen
        ? targetElement.classList.remove("hidden")
        : targetElement.classList.add("hidden");
    }
  }, [isOpen, elementId]);

  return (
    <button
      id={buttonId}
      clickOutside={clickOutside}
      ref={clickOutside ? dropdownRef : null}
      className={buttonClassName}
      onClick={toggleDropdown}
    >
      {children}
    </button>
  );
};

export default Dropdown;

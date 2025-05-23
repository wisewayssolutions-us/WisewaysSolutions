"use client";
import React, { useEffect, useState } from "react";
import { ToastInterface } from "../contexts/ToastContext";

interface ToastProps {
  toast: ToastInterface;
  position: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, position, onClose }) => {
  const { message, type } = toast;
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const enterTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    return () => clearTimeout(enterTimeout);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const getToastStyles = () => {
    const baseStyles =
      "rounded-md p-4 mb-3 flex justify-between items-center shadow-md transform transition-all duration-300";

    const animationStyles = getAnimationStyles();

    const styles = `${baseStyles} ${animationStyles}`;

    switch (type) {
      case "success":
        return `${styles} bg-green-100 border-l-4 border-green-500 text-green-700`;
      case "error":
        return `${styles} bg-red-100 border-l-4 border-red-500 text-red-700`;
      case "warning":
        return `${styles} bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700`;
      case "info":
      default:
        return `${styles} bg-blue-100 border-l-4 border-blue-500 text-blue-700`;
    }
  };

  const getAnimationStyles = () => {
    if (!isVisible) {
      switch (position) {
        case "top-left":
          return "-translate-x-full opacity-0";
        case "top-right":
          return "translate-x-full opacity-0";
        case "bottom-left":
          return "-translate-x-full opacity-0";
        case "bottom-right":
          return "translate-x-full opacity-0";
        default:
          return "translate-x-full opacity-0";
      }
    } else if (isExiting) {
      switch (position) {
        case "top-left":
          return "-translate-x-full opacity-0";
        case "top-right":
          return "translate-x-full opacity-0";
        case "bottom-left":
          return "-translate-x-full opacity-0";
        case "bottom-right":
          return "translate-x-full opacity-0";
        default:
          return "translate-x-full opacity-0";
      }
    }

    return "translate-x-0 opacity-100";
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "error":
        return (
          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "warning":
        return (
          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "info":
      default:
        return (
          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  return (
    <div className={getToastStyles()} role="alert">
      <div className="flex items-center">
        {getIcon()}
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={handleClose}
        className="ml-4 text-gray-400 hover:text-gray-600 focus:outline-none"
        aria-label="Close"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

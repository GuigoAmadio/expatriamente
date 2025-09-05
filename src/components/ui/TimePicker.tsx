"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChevronDown } from "lucide-react";

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function TimePicker({
  value,
  onChange,
  label,
  disabled = false,
  className = "",
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Extrair horas e minutos do value
  const getTimeFromValue = (timeValue: string) => {
    if (!timeValue) return { hours: "09", minutes: "00" };
    const [h, m] = timeValue.split(":");
    return { hours: h || "09", minutes: m || "00" };
  };

  const { hours, minutes } = getTimeFromValue(value);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 19; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleTimeSelect = (time: string) => {
    onChange(time);
    setIsOpen(false);
  };

  const isSelected = (time: string) => {
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}` === time;
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-stone-600">
          {label}
        </label>
      )}

      <div className="relative overflow-visible">
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-3/4 p-4 text-lg border-2 border-stone-200 rounded-xl focus:ring-2 focus:ring-[#a8b093] focus:border-[#a8b093] transition-all duration-200 bg-stone-50 focus:bg-white text-left flex items-center justify-between ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:border-[#a8b093]"
          }`}
        >
          <div className="flex items-center space-x-3">
            <Clock className="h-3 w-3 sm:h-5 sm:w-5 text-stone-400" />
            <span className="text-[#453706] font-medium text-sm sm:text-lg">
              {hours}:{minutes}
            </span>
          </div>
          <ChevronDown
            className={`h-5 w-5 text-stone-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`absolute md:w-96 top-full right-0 mt-2 bg-white border border-stone-200 rounded-xl shadow-lg z-50 p-3 md:p-4 ${
                label && label.includes("Início") ? "left-0" : ""
              }`}
            >
              <div className="max-h-64 overflow-y-auto w-full">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      disabled={disabled}
                      className={`p-2 md:p-3 text-xs md:text-sm font-medium rounded-lg transition-all duration-200 ${
                        isSelected(time)
                          ? "bg-[#a8b093] text-white shadow-md"
                          : "text-stone-600 hover:bg-stone-100 hover:text-[#a8b093]"
                      } ${
                        disabled
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

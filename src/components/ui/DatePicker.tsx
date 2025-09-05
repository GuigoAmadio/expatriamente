"use client";

import React, { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  minDate?: string;
  maxDate?: string;
}

export function DatePicker({
  value,
  onChange,
  label,
  disabled = false,
  className = "",
  minDate,
  maxDate,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = new Date();
  const selectedDate = value ? new Date(value) : null;

  const formatMonthYear = (date: Date) => {
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Dias do mês anterior
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevMonth = new Date(year, month - 1, 0);
      const day = prevMonth.getDate() - i;
      days.push({
        day,
        isCurrentMonth: false,
        date: new Date(year, month - 1, day),
      });
    }

    // Dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        date: new Date(year, month, day),
      });
    }

    // Dias do próximo mês
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        date: new Date(year, month + 1, day),
      });
    }

    return days;
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < new Date(minDate)) return true;
    if (maxDate && date > new Date(maxDate)) return true;
    return false;
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const handleDateSelect = (date: Date) => {
    if (disabled || isDateDisabled(date)) return;

    const dateString = date.toISOString().split("T")[0];
    onChange(dateString);
    setIsOpen(false);
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    if (direction === "prev") {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-stone-600 mb-2">
          {label}
        </label>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-3/4 p-2 sm:p-4 text-lg border-2 border-stone-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-stone-50 focus:bg-white text-left flex items-center justify-between ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:border-red-300"
        }`}
      >
        <span
          className={
            value
              ? "text-[#453706] text-sm sm:text-lg"
              : "text-stone-400 text-sm sm:text-lg"
          }
        >
          {value
            ? new Date(value).toLocaleDateString("pt-BR")
            : "Selecione uma data"}
        </span>
        <Calendar className="h-3 w-3 sm:h-5 sm:w-5 text-stone-400" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-stone-200 rounded-xl shadow-lg z-50 p-4">
          {/* Header do calendário */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateMonth("prev")}
              className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-stone-600" />
            </button>

            <h3 className="text-lg font-semibold text-[#453706]">
              {formatMonthYear(currentMonth)}
            </h3>

            <button
              onClick={() => navigateMonth("next")}
              className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 transition-colors"
            >
              <ChevronRight className="h-4 w-4 text-stone-600" />
            </button>
          </div>

          {/* Dias da semana */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-stone-500 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Dias do mês */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((dayData, index) => {
              const isDisabled = isDateDisabled(dayData.date);
              const isTodayDate = isToday(dayData.date);
              const isSelectedDate = isSelected(dayData.date);

              return (
                <button
                  key={index}
                  onClick={() => handleDateSelect(dayData.date)}
                  disabled={isDisabled}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isSelectedDate
                      ? "bg-red-500 text-white shadow-md"
                      : isTodayDate
                      ? "bg-blue-100 text-blue-600 font-bold"
                      : dayData.isCurrentMonth
                      ? "text-[#453706] hover:bg-red-50 hover:text-red-600"
                      : "text-stone-300"
                  } ${
                    isDisabled
                      ? "opacity-30 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  {dayData.day}
                </button>
              );
            })}
          </div>

          {/* Botão de hoje */}
          <div className="mt-4 pt-4 border-t border-stone-200">
            <button
              onClick={() => handleDateSelect(today)}
              className="w-full py-2 px-4 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Hoje
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMoreHorizontal,
} from "react-icons/fi";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  className = "",
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [inputPage, setInputPage] = useState(currentPage.toString());

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      setInputPage(page.toString());
    }
  };

  const handleInputChange = (value: string) => {
    setInputPage(value);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(inputPage);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    } else {
      setInputPage(currentPage.toString());
    }
  };

  if (totalPages <= 1) return null;

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {/* Controles de paginação - Centralizados */}
      <div className="flex items-center gap-3">
        {/* Botão Anterior */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2.5 text-sm font-medium text-blue-600 bg-white border border-blue-200 rounded-xl hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-blue-600 disabled:hover:border-blue-200 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <FiChevronLeft className="w-4 h-4" />
          <span className="hidden sm:ml-1 sm:inline">Anterior</span>
        </button>

        {/* Páginas - Desktop */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Primeira página */}
          {startPage > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="relative inline-flex items-center justify-center w-10 h-10 text-sm font-medium text-blue-600 bg-white border border-blue-200 rounded-xl hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                1
              </button>
              {startPage > 2 && (
                <span className="relative inline-flex items-center justify-center w-10 h-10 text-sm font-medium text-blue-400">
                  <FiMoreHorizontal className="w-4 h-4" />
                </span>
              )}
            </>
          )}

          {/* Páginas do meio */}
          {Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
          ).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`relative inline-flex items-center justify-center w-10 h-10 text-sm font-medium rounded-xl transition-all duration-200 shadow-sm hover:shadow-md ${
                page === currentPage
                  ? "z-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white border border-blue-600 shadow-lg transform scale-105"
                  : "text-blue-600 bg-white border border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Última página */}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="relative inline-flex items-center justify-center w-10 h-10 text-sm font-medium text-blue-400">
                  <FiMoreHorizontal className="w-4 h-4" />
                </span>
              )}
              <button
                onClick={() => handlePageChange(totalPages)}
                className="relative inline-flex items-center justify-center w-10 h-10 text-sm font-medium text-blue-600 bg-white border border-blue-200 rounded-xl hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* Páginas - Mobile */}
        <div className="flex sm:hidden items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl">
          <span className="text-sm text-blue-700 font-medium">
            Página {currentPage} de {totalPages}
          </span>
        </div>

        {/* Botão Próximo */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-4 py-2.5 text-sm font-medium text-blue-600 bg-white border border-blue-200 rounded-xl hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-blue-600 disabled:hover:border-blue-200 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <span className="hidden sm:mr-1 sm:inline">Próximo</span>
          <FiChevronRight className="w-4 h-4" />
        </button>

        {/* Input para ir direto para uma página */}
        <div className="hidden xl:flex items-center gap-3 ml-4 px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl">
          <span className="text-sm text-blue-700 font-medium">Ir para:</span>
          <form
            onSubmit={handleInputSubmit}
            className="flex items-center gap-2"
          >
            <input
              type="number"
              min="1"
              max={totalPages}
              value={inputPage}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-16 px-3 py-1.5 text-sm text-center border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-200"
            />
            <button
              type="submit"
              className="px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 border border-transparent rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
            >
              Ir
            </button>
          </form>
        </div>
      </div>

      {/* Informações de paginação - Abaixo e alinhado à esquerda */}
      <div className="w-full">
        <p className="text-sm text-blue-700 font-medium text-left">
          Mostrando{" "}
          <span className="font-semibold text-blue-800">
            {(currentPage - 1) * itemsPerPage + 1}
          </span>{" "}
          a{" "}
          <span className="font-semibold text-blue-800">
            {Math.min(currentPage * itemsPerPage, totalItems)}
          </span>{" "}
          de <span className="font-semibold text-blue-800">{totalItems}</span>{" "}
          resultados
        </p>
      </div>
    </div>
  );
}

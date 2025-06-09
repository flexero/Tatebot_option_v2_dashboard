"use client";

import TitleLine from "@/components/TitleLine";
import apiClient from "@/lib/axios";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";

  return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
};

type RowsPerPage = 5 | 10 | 15 | 20;

const ClosePositionPage = () => {
  const [openPositions, setOpenPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const result = apiClient
      .get("/api/trader/closedpositions")
      .then((res) => {
        console.log(res.data);
        setOpenPositions(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Calculate total pages
  const totalRows = openPositions.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  // Get current page data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return openPositions.slice(startIndex, endIndex);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Enhanced Header Section */}
      <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <h2 className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-2xl font-bold text-transparent">
            Closed Positions History
          </h2>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              Total Trades: {openPositions.length}
            </span>
            <span className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
            <span className="text-gray-500 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </div>

        {/* Controls Group */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Enhanced Rows Selector */}
          <div className="relative">
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value) as RowsPerPage);
                setCurrentPage(1);
              }}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 
                         py-2.5 pr-10 text-sm font-medium text-gray-700 transition-all duration-200 focus:border-emerald-500
                         focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700
                         dark:bg-gray-900 dark:text-gray-300"
            >
              {[5, 10, 15, 20].map((value) => (
                <option key={value} value={value}>
                  Show {value} entries
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <svg
                className="h-4 w-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Enhanced Pagination */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-2.5 text-sm
                       font-medium text-gray-700 transition-all duration-200
                       hover:bg-gray-100 disabled:cursor-not-allowed
                       disabled:opacity-50 dark:bg-gray-900
                       dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-2.5 text-sm
                       font-medium text-gray-700 transition-all duration-200
                       hover:bg-gray-100 disabled:cursor-not-allowed
                       disabled:opacity-50 dark:bg-gray-900
                       dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Next
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Enhanced Table Section */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50">
                {[
                  "No",
                  "Asset",
                  "Order Type",
                  "Side",
                  "Status",
                  "Qty",
                  "Filled Qty",
                  "Submitted At",
                  "Filled At",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {getCurrentPageData().map(
                (order: any, index: number) =>
                  order.asset_class === "us_option" && (
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      key={order.id}
                      className="transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                    >
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {(currentPage - 1) * rowsPerPage + index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {order.symbol}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs
                        font-medium text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                        >
                          {order.order_type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${
                          order.side === "buy"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                        }`}
                        >
                          {order.side}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs
                        font-medium text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {order.qty}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {order.filled_qty}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDateTime(order.submitted_at)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {order.filled_at
                            ? formatDateTime(order.filled_at)
                            : "-"}
                        </span>
                      </td>
                    </motion.tr>
                  ),
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="border-3 h-8 w-8 rounded-full border-emerald-500 border-t-transparent"
          />
        </div>
      )}
    </motion.div>
  );
};

export default ClosePositionPage;

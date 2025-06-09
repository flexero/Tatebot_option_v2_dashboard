"use client";
import { useState, useEffect } from "react";
import apiClient from "@/lib/axios";
import { toast } from "react-toastify";
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

const OpenStockPositions = ({
  stockOpenPositions,
}: {
  stockOpenPositions: any[];
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  // Calculate total pages
  const totalRows = stockOpenPositions.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  // Get current page data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return stockOpenPositions.slice(startIndex, endIndex);
  };

  const handleCloseClick = (order: any) => {
    setSelectedOrder(order);
    setShowConfirmModal(true);
  };

  const handleConfirmClose = () => {
    // Add your close position logic here
    console.log("Closing position:", selectedOrder);

    const payload = {
      symbol: selectedOrder.symbol,
      side: selectedOrder.side,
      quantity: selectedOrder.qty,
    };

    console.log("payload", payload);

    const result = apiClient
      .post("/api/trader/closeStockOrder", payload)
      .then((res) => {
        console.log("res", res);
        if (res.data === 200) {
          toast.success("Position closed successfully");
          console.log(res.data);
          setShowConfirmModal(false);
          setSelectedOrder(null);
        } else {
          toast.info(
            "Position is not closed. Please check the market time or sufficient balance",
          );
        }
      })
      .catch((err) => {
        toast.error("Error closing position");
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("open stock positions", stockOpenPositions);
  }, [stockOpenPositions]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header Section */}
      <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800 md:flex-row">
        {/* Title */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
            Stock Open Positions
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your active trading positions
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Rows Per Page Selector */}
          <div className="relative">
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value) as RowsPerPage);
                setCurrentPage(1);
              }}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 
                         py-2.5 pr-10 text-sm font-medium text-gray-700 transition-all duration-200 focus:border-blue-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700
                         dark:bg-gray-900 dark:text-gray-300"
            >
              {[5, 10, 15, 20].map((value) => (
                <option key={value} value={value}>
                  {value} rows
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

          {/* Pagination */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 rounded-xl bg-gray-50 px-4 py-2.5 text-sm
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

            <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 dark:bg-blue-900/20">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Page {currentPage} of {totalPages}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 rounded-xl bg-gray-50 px-4 py-2.5 text-sm
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

      {/* Table Section */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50">
                {[
                  "No",
                  "Asset",
                  "Side",
                  "Qty",
                  "Price",
                  "Avg Entry",
                  "Today's P/L(%)",
                  "Today's P/L($)",
                  "Total P/L(%)",
                  "Total P/L($)",
                  "Action",
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
                  order.asset_class === "us_equity" && (
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      key={index}
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
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${
                          order.side === "long"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                        }`}
                        >
                          {order.side}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {order.qty}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        ${Number(order.current_price).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        ${Number(order.avg_entry_price).toFixed(2)}
                      </td>
                      {/* P/L Cells with enhanced styling */}
                      <PLCell
                        value={order.unrealized_intraday_plpc * 100}
                        format="percent"
                      />
                      <PLCell
                        value={order.unrealized_intraday_pl}
                        format="currency"
                      />
                      <PLCell
                        value={order.unrealized_plpc * 100}
                        format="percent"
                      />
                      <PLCell value={order.unrealized_pl} format="currency" />
                      <td className="px-6 py-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCloseClick(order)}
                          className="rounded-xl bg-gradient-to-r from-red-500 to-rose-500 px-4 py-2
                                 text-sm font-medium text-white shadow-sm transition-all
                                 duration-200 hover:from-red-600 hover:to-rose-600 hover:shadow"
                        >
                          Close Position
                        </motion.button>
                      </td>
                    </motion.tr>
                  ),
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-red-100 p-2 dark:bg-red-900/20">
                    <svg
                      className="h-6 w-6 text-red-600 dark:text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Close Position
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-gray-400">
                  Are you sure you want to close your position for{" "}
                  {selectedOrder?.symbol}?
                </p>

                <div className="mt-2 flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleConfirmClose}
                    className="flex-1 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 px-4
                             py-2.5 font-medium text-white shadow-sm transition-all
                             duration-200 hover:from-red-600 hover:to-rose-600 hover:shadow"
                  >
                    Confirm Close
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowConfirmModal(false);
                      setSelectedOrder(null);
                    }}
                    className="flex-1 rounded-xl bg-gray-100 px-4 py-2.5
                             font-medium text-gray-700 transition-all duration-200
                             hover:bg-gray-200 dark:bg-gray-700
                             dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Helper component for P/L cells
const PLCell = ({
  value,
  format,
}: {
  value: number;
  format: "percent" | "currency";
}) => {
  const isPositive = value >= 0;
  const formattedValue =
    format === "percent"
      ? `${isPositive ? "+" : ""}${value.toFixed(2)}%`
      : `${isPositive ? "+" : "-"}$${Math.abs(value).toFixed(2)}`;

  return (
    <td className="px-6 py-4">
      <span
        className={`inline-flex items-center gap-1 text-sm font-medium
        ${
          isPositive
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
        }`}
      >
        {formattedValue}
        <svg
          className="h-3 w-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={
              isPositive
                ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                : "M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"
            }
          />
        </svg>
      </span>
    </td>
  );
};

export default OpenStockPositions;

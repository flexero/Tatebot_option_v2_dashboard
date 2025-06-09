"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import apiClient from "@/lib/axios";
import { toast } from "react-toastify";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";

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

const TransactionsPage = () => {
  const [historyOrders, setHistoryOrders] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rowsPerPage, setRowsPerPage] = useState<RowsPerPage>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get("/get_all_orders")
      .then((res) => {
        console.log(res.data);
        setHistoryOrders(res.data);
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
  const totalRows = historyOrders.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  // Get current page data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return historyOrders.slice(startIndex, endIndex);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 p-6"
    >
      {/* Enhanced Header */}
      <div className="space-y-4">
        <motion.h1
          className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-3xl font-bold text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          My Transactions
        </motion.h1>
        <motion.div
          className="flex items-center gap-2"
          initial={{ width: 0 }}
          animate={{ width: "auto" }}
        >
          <span className="h-1.5 w-24 rounded-full bg-primary/60" />
          <span className="h-1.5 w-12 rounded-full bg-primary/40" />
          <span className="h-1.5 w-6 rounded-full bg-primary/20" />
        </motion.div>
        <p className="text-gray-600 dark:text-gray-400">
          View and track your trading history
        </p>
      </div>

      {/* Enhanced Controls Section */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Modern Dropdown */}
        <div className="relative">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Entries per page
          </label>
          <div className="relative">
            <motion.select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value) as RowsPerPage);
                setCurrentPage(1);
              }}
              className="w-full min-w-[140px] cursor-pointer appearance-none rounded-xl border border-gray-200 
                bg-white px-4 py-2.5 pr-10 text-sm font-medium outline-none transition-all
                duration-200 hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20
                dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              {[5, 10, 15, 20].map((value) => (
                <option key={value} value={value}>
                  {value} entries
                </option>
              ))}
            </motion.select>
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
        </div>

        {/* Enhanced Pagination */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4
              py-2.5 text-sm font-medium transition-all duration-200
              hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50
              dark:border-gray-700 dark:bg-gray-800
              dark:hover:bg-gray-700"
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

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page
            </span>
            <motion.span
              key={currentPage}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="min-w-[40px] rounded-xl bg-primary px-4 py-2 text-center font-medium text-white"
            >
              {currentPage}
            </motion.span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              of {totalPages}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4
              py-2.5 text-sm font-medium transition-all duration-200
              hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50
              dark:border-gray-700 dark:bg-gray-800
              dark:hover:bg-gray-700"
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

      {/* Enhanced Table */}
      <motion.div
        className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                No
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Asset
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Type
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Side
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Qty
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Filled
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Submitted
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Filled At
              </th>
            </tr>
          </thead>

          <tbody>
            {getCurrentPageData().map((order: any, index: number) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-100 transition-colors duration-150 hover:bg-gray-50/50
                  dark:border-gray-700 dark:hover:bg-gray-700/50"
              >
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {order.symbol}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs
                    font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {order.order_type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      order.side === "buy"
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30"
                        : "bg-red-100 text-red-600 dark:bg-red-900/30"
                    }`}
                  >
                    {order.side.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className="rounded-full bg-blue-100 px-3 py-1 text-xs
                    font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {Math.round(order.qty || 0).toFixed(1)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {Math.round(order.filled_qty || 0).toFixed(1)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {formatDateTime(order.submitted_at)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {formatDateTime(order.filled_at)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default TransactionsPage;

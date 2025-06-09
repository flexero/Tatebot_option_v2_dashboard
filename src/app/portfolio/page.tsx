"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import apiClient from "@/lib/axios";
import PortfolioChart from "@/components/portfolioChart";
import TitleLine from "@/components/TitleLine";

type RowsPerPage = 10 | 20 | "all";

interface PortfolioHistory {
  timestamp: number[];
  equity: number[];
  profit_loss: number[];
  profit_loss_pct: number[];
  base_value: number;
}

const MyPortfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [accountInfo, setAccountInfo] = useState<any>(null);
  const [positions, setPositions] = useState<any>(null);
  const [portfolioHistory, setPortfolioHistory] =
    useState<PortfolioHistory | null>(null);

  const [rowsPerPage, setRowsPerPage] = useState<RowsPerPage>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatPercentage = (num: number) => {
    return (num * 100).toFixed(4) + "%";
  };

  useEffect(() => {
    setIsLoading(true);
    apiClient.get("/account").then((res) => {
      setAccountInfo(res.data.account_info);
      setPortfolioHistory(res.data.portfolio_history);
      setPositions(res.data.positions);

      setIsLoading(false);
      console.log(res.data);
    });
  }, []);

  // Calculate total pages
  const totalRows: number = portfolioHistory?.timestamp.length || 0;
  const totalPages: number = Math.ceil(
    totalRows / (rowsPerPage === "all" ? totalRows : rowsPerPage),
  );

  // Get current page data
  const getCurrentPageData = (): number[] => {
    const reversedData = portfolioHistory?.timestamp.slice().reverse() || [];
    if (rowsPerPage === "all") return reversedData;

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return reversedData.slice(startIndex, endIndex);
  };

  const handleRowsPerPageChange = (value: string): void => {
    const newValue = value === "all" ? "all" : (Number(value) as RowsPerPage);
    setRowsPerPage(newValue);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6"
    >
      {/* Enhanced Header */}
      <div className="space-y-2">
        <h1 className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-3xl font-bold text-transparent">
          Portfolio Status
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your investment performance and history
        </p>
      </div>

      {/* Chart Section */}
      <motion.div
        className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-dark"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <PortfolioChart portfolioHistory={portfolioHistory} />
      </motion.div>

      {/* Enhanced Table Controls */}
      <div className="flex flex-col items-center justify-between gap-4 px-2 sm:flex-row">
        {/* Modern Dropdown */}
        <div className="group relative">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Display Entries
          </label>
          <motion.select
            value={rowsPerPage}
            onChange={(e) => handleRowsPerPageChange(e.target.value)}
            className="min-w-[140px] cursor-pointer appearance-none rounded-xl border border-gray-200 
              bg-white px-4 py-2.5 pr-10 text-sm font-medium outline-none transition-all
              duration-200 hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20
              dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          >
            <option value={10}>10 entries</option>
            <option value={20}>20 entries</option>
            <option value="all">All entries</option>
          </motion.select>
          <div className="pointer-events-none absolute right-3 top-[38px]">
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
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium
              transition-all duration-200 hover:bg-gray-100
              disabled:cursor-not-allowed disabled:opacity-50
              dark:hover:bg-gray-800"
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

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600 dark:text-gray-400">Page</span>
            <motion.span
              className="min-w-[40px] rounded-xl bg-primary px-4 py-2 text-center font-medium text-white"
              key={currentPage}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              {currentPage}
            </motion.span>
            <span className="text-gray-600 dark:text-gray-400">
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
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium
              transition-all duration-200 hover:bg-gray-100
              disabled:cursor-not-allowed disabled:opacity-50
              dark:hover:bg-gray-800"
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
        className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-dark"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                No
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Equity
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Profit/Loss
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                P/L %
              </th>
            </tr>
          </thead>
          <tbody>
            {getCurrentPageData().map((time, index) => {
              const reverseIndex =
                portfolioHistory?.timestamp.length -
                  1 -
                  (rowsPerPage === "all"
                    ? index
                    : (currentPage - 1) * (rowsPerPage as number) + index) || 0;
              const isProfitPositive =
                portfolioHistory?.profit_loss[reverseIndex] >= 0;
              const isProfitPctPositive =
                portfolioHistory?.profit_loss_pct[reverseIndex] >= 0;

              return (
                <motion.tr
                  key={time}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 transition-colors duration-150 hover:bg-gray-50/50
                    dark:border-gray-800 dark:hover:bg-gray-800/50"
                >
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {(currentPage - 1) *
                      (rowsPerPage === "all" ? 1 : rowsPerPage) +
                      index +
                      1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(time)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    ${formatNumber(portfolioHistory?.equity[reverseIndex])}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm font-medium ${
                      isProfitPositive ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {isProfitPositive ? "↑" : "↓"}$
                      {formatNumber(
                        Math.abs(
                          portfolioHistory?.profit_loss[reverseIndex] || 0,
                        ),
                      )}
                    </div>
                  </td>
                  <td
                    className={`px-6 py-4 text-sm font-medium ${
                      isProfitPctPositive ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {isProfitPctPositive ? "↑" : "↓"}
                      {formatPercentage(
                        Math.abs(
                          portfolioHistory?.profit_loss_pct[reverseIndex] || 0,
                        ),
                      )}
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Base Value
              </td>
              <td
                className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300"
                colSpan={3}
              >
                ${formatNumber(portfolioHistory?.base_value)}
              </td>
            </tr>
          </tfoot>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default MyPortfolio;

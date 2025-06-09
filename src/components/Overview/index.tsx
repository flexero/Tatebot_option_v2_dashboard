"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import apiClient from "@/lib/axios";
import AccountInfor from "../Stocktable/accountInfor";
import Position from "./position";
import {
  BuySellOrder,
  ProfitLoss,
  TotalTransaction,
  TotalView,
} from "public/index";
import ProfitChat from "../profitChart";
import { toast } from "react-toastify";

const Overview = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [accountInfo, setAccountInfo] = useState<any>(null);
  const [positions, setPositions] = useState<any>(null);
  const [portfolioHistory, setPortfolioHistory] = useState<any>(null);
  const [orders, setOrders] = useState<any>(null);

  const [buyOrders, setBuyOrders] = useState<any>(null);
  const [sellOrders, setSellOrders] = useState<any>(null);
  const [totalBuyNumber, setTotalBuyNumber] = useState<number>(0);
  const [totalSellNumber, setTotalSellNumber] = useState<number>(0);

  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [orderType, setOrderType] = useState<"buy" | "sell" | null>(null);

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
    setBuyOrders(0);
    setSellOrders(0);
    setTotalBuyNumber(0);
    setTotalSellNumber(0);
    apiClient.get("/account").then((res) => {
      setAccountInfo(res.data.account_info);
      setPortfolioHistory(res.data.portfolio_history);
      setPositions(res.data.positions);
      setOrders(res.data.orders);

      setBuyOrders(res.data.buyOrders);
      setSellOrders(res.data.sellOrders);
      setTotalBuyNumber(res.data.buyAmount);
      setTotalSellNumber(res.data.sellAmount);

      setIsLoading(false);
      console.log(res.data);
    });
  }, []);

  const handleOrderClick = (type: "buy" | "sell") => {
    if (symbol === "" || quantity === "") {
      toast.error("Please enter a symbol and quantity");
      return;
    }
    setOrderType(type);
    setShowConfirm(true);
  };

  const buySellOrder = () => {
    apiClient
      .post("/buySellOrder", {
        symbol: symbol,
        quantity: quantity,
        type: orderType,
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Order placed successfully");
        // Reset form
        setSymbol("");
        setQuantity("");
      })
      .catch((err) => {
        toast.error("Error placing order");
      })
      .finally(() => {
        setShowConfirm(false);
        setOrderType(null);
      });
  };

  const handleReload = () => {
    window.location.reload();
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen p-6"
    >
      {/* Header Section */}
      <motion.div className="mb-8 space-y-4" variants={cardVariants}>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
              Trading Overview
            </h1>
            <div className="flex items-center gap-2">
              <motion.span
                className="h-1.5 w-24 rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 1 }}
              />
              <motion.span
                className="h-1.5 w-12 rounded-full bg-primary/60"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReload}
            className="rounded-xl bg-gradient-to-r from-primary/10 to-blue-500/10 p-3 transition-all hover:from-primary/20 hover:to-blue-500/20"
          >
            <span className="text-primary">Refresh</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Profit/Loss Card */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5 }}
          className="rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-dark"
        >
          <div className="flex flex-col gap-6">
            <div className="flex-grow">
              <ProfitLoss />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#F7931A]/20 to-[#F7931A]/10">
                  <span className="text-2xl text-[#F7931A]">$</span>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Profit/Loss
                  </p>
                  <motion.h3
                    className="text-2xl font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    $
                    {formatNumber(
                      portfolioHistory?.equity[
                        portfolioHistory?.equity.length - 1
                      ] - portfolioHistory?.base_value,
                    )}
                  </motion.h3>

                  {/* Percentage Change */}
                  {(() => {
                    const totalProfitLossPct =
                      portfolioHistory?.profit_loss_pct.reduce(
                        (sum, pct) => sum + pct,
                        0,
                      );
                    return (
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${
                          totalProfitLossPct >= 0
                            ? "bg-green-100 text-green-600 dark:bg-green-900/30"
                            : "bg-red-100 text-red-600 dark:bg-red-900/30"
                        }`}
                      >
                        {totalProfitLossPct >= 0 ? "↑" : "↓"}
                        {(Math.abs(totalProfitLossPct || 0) * 100).toFixed(2)}%
                      </motion.div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Transactions Card */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5 }}
          className="rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-dark"
        >
          <div className="flex flex-col gap-6">
            <div className="flex-grow">
              <TotalTransaction />
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Buy Orders */}
              <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Buy Orders
                </p>
                <motion.h4
                  className="text-xl font-semibold text-green-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {buyOrders} orders
                </motion.h4>
                <p className="text-sm">
                  Total:{" "}
                  <span className="font-medium text-green-500">
                    ${totalBuyNumber.toFixed(2)}
                  </span>
                </p>
              </div>

              {/* Sell Orders */}
              <div className="space-y-2 text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sell Orders
                </p>
                <motion.h4
                  className="text-xl font-semibold text-red-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {sellOrders} orders
                </motion.h4>
                <p className="text-sm">
                  Total:{" "}
                  <span className="font-medium text-red-500">
                    ${totalSellNumber.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Buy/Sell Order Card */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5 }}
          className="rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-dark"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <BuySellOrder />
              <h3 className="text-xl font-semibold">Quick Trade</h3>
            </div>

            <div className="space-y-4">
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <input
                  type="text"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                  placeholder="Symbol (e.g., AAPL)"
                  className="w-full rounded-xl border border-gray-200 bg-transparent px-4 py-3 transition-all duration-300 focus:border-primary dark:border-gray-700 dark:focus:border-primary"
                />
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Quantity"
                  className="w-full rounded-xl border border-gray-200 bg-transparent px-4 py-3 transition-all duration-300 focus:border-primary dark:border-gray-700 dark:focus:border-primary"
                />
              </motion.div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOrderClick("buy")}
                  className="flex-1 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 py-3 font-medium text-white shadow-lg shadow-green-500/20 transition-all duration-300 hover:shadow-green-500/40"
                >
                  Buy
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOrderClick("sell")}
                  className="flex-1 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 py-3 font-medium text-white shadow-lg shadow-red-500/20 transition-all duration-300 hover:shadow-red-500/40"
                >
                  Sell
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Chart Section */}
      <motion.div variants={cardVariants} className="mt-8 space-y-6">
        {/* Chart Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6">
          <div className="space-y-2">
            <h2 className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-2xl font-bold text-transparent">
              Portfolio Performance
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Track your investment growth over time
            </p>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center gap-2">
            {["1D", "1W", "1M", "3M", "YTD", "1Y", "ALL"].map((range) => (
              <motion.button
                key={range}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg px-3 py-1.5 text-sm font-medium 
                  transition-all duration-300 hover:bg-primary/10
                  focus:outline-none focus:ring-2 focus:ring-primary/20
                  data-[active=true]:bg-primary data-[active=true]:text-white"
                data-active={range === "1M"}
              >
                {range}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Main Chart Container */}
        <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-dark">
          {/* Chart Stats Overview */}
          <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-xl bg-gradient-to-r from-primary/5 to-blue-500/5 p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Return
              </p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                $
                {formatNumber(
                  portfolioHistory?.equity[
                    portfolioHistory?.equity.length - 1
                  ] - portfolioHistory?.base_value,
                )}
              </p>
              <p
                className={`text-sm ${
                  portfolioHistory?.profit_loss_pct.reduce(
                    (sum, pct) => sum + pct,
                    0,
                  ) >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {formatPercentage(
                  portfolioHistory?.profit_loss_pct.reduce(
                    (sum, pct) => sum + pct,
                    0,
                  ),
                )}
              </p>
            </div>

            <div className="rounded-xl bg-gradient-to-r from-green-500/5 to-emerald-500/5 p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">High</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                ${formatNumber(Math.max(...(portfolioHistory?.equity || [0])))}
              </p>
              <p className="text-sm text-gray-500">
                {formatDate(
                  portfolioHistory?.timestamp[
                    portfolioHistory?.equity.indexOf(
                      Math.max(...portfolioHistory?.equity),
                    )
                  ],
                )}
              </p>
            </div>

            <div className="rounded-xl bg-gradient-to-r from-red-500/5 to-rose-500/5 p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Low</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                ${formatNumber(Math.min(...(portfolioHistory?.equity || [0])))}
              </p>
              <p className="text-sm text-gray-500">
                {formatDate(
                  portfolioHistory?.timestamp[
                    portfolioHistory?.equity.indexOf(
                      Math.min(...portfolioHistory?.equity),
                    )
                  ],
                )}
              </p>
            </div>

            <div className="rounded-xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Average
              </p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                $
                {formatNumber(
                  portfolioHistory?.equity.reduce((a, b) => a + b, 0) /
                    portfolioHistory?.equity.length,
                )}
              </p>
              <p className="text-sm text-gray-500">Daily Average</p>
            </div>
          </div>

          {/* Main Chart */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="h-[400px] w-full"
            >
              <ProfitChat portfolioHistory={portfolioHistory} />
            </motion.div>

            {/* Chart Overlay Elements */}
            <div className="absolute bottom-4 left-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary/20" />
                <span className="text-sm text-gray-500">Portfolio Value</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500/20" />
                <span className="text-sm text-gray-500">Profit/Loss</span>
              </div>
            </div>

            {/* Interactive Features */}
            <div className="absolute right-8 top-[-20px] flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Download Chart"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Fullscreen"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-2V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Account Info and Position Section - Full Width */}
      <motion.div variants={cardVariants} className="mt-8 space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <h2 className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-2xl font-bold text-transparent">
            Portfolio Details
          </h2>
          <motion.div
            className="h-1 w-24 rounded-full bg-gradient-to-r from-primary to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1 }}
          />
        </div>

        {/* Full Width Grid Layout */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Account Information Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            className="rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-dark"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Account Information
              </h3>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"
              >
                <span className="text-xl text-primary">💼</span>
              </motion.div>
            </div>
            <AccountInfor accountInfo={accountInfo} />
          </motion.div>

          {/* Positions Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            className="rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-dark"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Current Positions
              </h3>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"
              >
                <span className="text-xl text-primary">📊</span>
              </motion.div>
            </div>
            <Position positions={positions} />
          </motion.div>
        </div>

        {/* Additional Stats or Summary - Full Width */}
        <motion.div
          variants={cardVariants}
          className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {/* Total Portfolio Value */}
          <div className="rounded-xl bg-gradient-to-r from-primary/10 to-blue-500/10 p-6">
            <h4 className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              Total Portfolio Value
            </h4>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              ${formatNumber(accountInfo?.portfolio_value || 0)}
            </p>
          </div>

          {/* Active Positions */}
          <div className="rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6">
            <h4 className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              Active Positions
            </h4>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {positions?.length || 0}
            </p>
          </div>

          {/* Available Cash */}
          <div className="rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6">
            <h4 className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              Available Cash
            </h4>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              ${formatNumber(accountInfo?.cash || 0)}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="mx-4 w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800"
            >
              <h3 className="mb-4 text-xl font-semibold">
                Confirm {orderType?.toUpperCase()} Order
              </h3>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Are you sure you want to {orderType} {quantity} shares of{" "}
                {symbol}?
              </p>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={buySellOrder}
                  className={`flex-1 rounded-xl py-3 font-medium text-white transition-all duration-300 ${
                    orderType === "buy"
                      ? "bg-gradient-to-r from-green-500 to-emerald-600"
                      : "bg-gradient-to-r from-red-500 to-rose-600"
                  }`}
                >
                  Confirm
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowConfirm(false);
                    setOrderType(null);
                  }}
                  className="flex-1 rounded-xl border border-gray-200 py-3 font-medium transition-all duration-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Overview;

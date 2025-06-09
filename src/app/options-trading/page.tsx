"use client";

import { useState, useRef, useEffect } from "react";
import apiClient from "@/lib/axios";
import TitleLine from "@/components/TitleLine";
import { stockTickers } from "@/assets/data";
import OptionsChainComponent from "./optionsChainComponent";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

interface OptionChainData {
  snapshots: any; // Replace 'any' with proper type based on your API response
}

const OptionsTradingPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [symbol, setSymbol] = useState("");
  const [optionType, setOptionType] = useState<string>("call");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredTickers, setFilteredTickers] = useState<string[]>([]);
  const [optionChain, setOptionChain] = useState<OptionChainData | null>(null);
  const [current_Price, setCurrent_Price] = useState<string>("");
  const [strikePrice, setStrikePrice] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("");
  const searchRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    setSelectedDate(newDate);
    console.log(selectedDate);
  };

  const handleSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^A-Za-z]/g, "").toUpperCase();
    setSymbol(value);

    if (value.length > 0) {
      const filtered = stockTickers
        .filter((ticker) => ticker.startsWith(value))
        .slice(0, 5); // Show only first 5 matches
      setFilteredTickers(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredTickers([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (ticker: string) => {
    setSymbol(ticker);
    setShowSuggestions(false);
  };

  const viewOptionChain = async () => {
    try {
      if (symbol === "") {
        toast.error("Please enter a symbol");
        return;
      }
      if (optionType === "") {
        toast.error("Please select an option type");
        return;
      }

      const formattedDate = selectedDate.toISOString().split("T")[0];
      const payload = {
        symbol,
        optionType,
        date: formattedDate,
      };
      console.log("payload", payload);

      const response = await apiClient
        .post("/api/brokerage/getOptionsChain", payload)
        .then((res) => {
          console.log("res", res);
          toast.success("Option chain fetched successfully");
          setOptionChain({
            snapshots: res.data.options_data,
          });
          setCurrent_Price(res.data.current_price);
        })
        .catch((err) => {
          toast.error("Error fetching option chain");
          console.log("err", err);
          return;
        });
    } catch (err: any) {
      console.error("Error fetching option chain:", err);
      setError(err.response?.data?.message || "Failed to fetch option chain");
    }
  };

  const buyOptions = async () => {
    console.log("buyOptions");
    const strikePrice_main = strikePrice.split(" | ")[0];
    if (strikePrice_main === "") {
      toast.error("Please select a strike price");
      return;
    }
    if (amount === "") {
      toast.error("Please enter an amount");
      return;
    }

    const payload = {
      symbol: strikePrice_main,
      amount: amount,
    };

    const response = await apiClient
      .post("/api/brokerage/buyOptions", payload)
      .then((res) => {
        toast.success("Options bought successfully");
        console.log("res", res);
      })
      .catch((err) => {
        toast.error("Error buying options");
        console.log("err", err);
      });
  };

  useEffect(() => {
    // console.log("optionChain0", optionChain["snapshot"]);
    // console.log("optionChain[0]", optionChain[0]);
    console.log("optionChain[0].snapshots", optionChain);
  }, [optionChain]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen space-y-6 p-6"
    >
      {/* Enhanced Header */}
      <div className="space-y-3">
        <h1 className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-3xl font-bold text-transparent">
          Options Trading
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Trade options with advanced analytics and real-time market data
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Trading Panel */}
        <motion.div
          className="w-full space-y-6 lg:w-1/4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Trading Form Card */}
          <div className="space-y-5 rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-xl font-semibold text-transparent">
              Trading Controls
            </h3>

            {/* Symbol Search */}
            <div className="relative" ref={searchRef}>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <motion.svg
                  className="h-5 w-5 text-gray-400"
                  animate={{ rotate: showSuggestions ? 180 : 0 }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </motion.svg>
              </div>
              <input
                type="text"
                value={symbol}
                onChange={handleSymbolChange}
                onFocus={() => symbol.length > 0 && setShowSuggestions(true)}
                placeholder="Search symbol..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4
                  text-sm font-medium text-gray-900 placeholder-gray-500
                  transition-all duration-300
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                  dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400"
              />

              {/* Enhanced Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && filteredTickers.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
                  >
                    {filteredTickers.map((ticker, index) => (
                      <motion.button
                        key={ticker}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSuggestionClick(ticker)}
                        className="group flex w-full items-center justify-between px-4 py-3 text-left
                          text-sm font-medium text-gray-700 transition-colors
                          duration-200 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                      >
                        <span>{ticker}</span>
                        <motion.span
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-blue-500 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          Select
                        </motion.span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Option Type Selection */}
            <div className="grid grid-cols-2 gap-3 rounded-xl bg-gray-100 p-1 dark:bg-gray-900">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOptionType("call")}
                className={`flex items-center justify-center gap-2 rounded-lg py-3
                  text-sm font-medium transition-all duration-300 ${
                    optionType === "call"
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                      : "text-gray-600 hover:bg-white dark:text-gray-400 dark:hover:bg-gray-800"
                  }`}
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                CALL
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOptionType("put")}
                className={`flex items-center justify-center gap-2 rounded-lg py-3
                  text-sm font-medium transition-all duration-300 ${
                    optionType === "put"
                      ? "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg"
                      : "text-gray-600 hover:bg-white dark:text-gray-400 dark:hover:bg-gray-800"
                  }`}
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
                    d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"
                  />
                </svg>
                PUT
              </motion.button>
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Trade Amount
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <span className="font-medium text-gray-500 dark:text-gray-400">
                    $
                  </span>
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4
                    text-sm font-medium text-gray-900 transition-all
                    duration-300 focus:border-blue-500 focus:ring-2
                    focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  placeholder="Enter amount..."
                />
              </div>
            </div>

            {/* Strike Price Display */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Selected Strike
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={strikePrice}
                  readOnly
                  className="w-full cursor-default rounded-xl border border-gray-200 bg-gray-50 px-4
                    py-3 text-sm font-medium text-gray-900
                    dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  placeholder="No strike selected"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={viewOptionChain}
                className="flex w-full items-center justify-center gap-2 rounded-xl
                  bg-gradient-to-r from-blue-500 to-purple-500 py-3 text-sm
                  font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl"
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                View Chain
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={buyOptions}
                className="flex w-full items-center justify-center gap-2 rounded-xl
                  bg-gradient-to-r from-green-500 to-emerald-600 py-3 text-sm
                  font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl"
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Place Trade
              </motion.button>
            </div>
          </div>

          {/* Enhanced Calendar Component */}
          <div className="w-full rounded-xl bg-white p-3 shadow-lg dark:bg-gray-800">
            <h3 className="mb-1 text-base font-semibold text-gray-800 dark:text-white">
              Select Date
            </h3>
            <div className="mb-1 flex items-center justify-between">
              <button
                onClick={handlePrevMonth}
                className="rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
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
              </button>
              <h2 className="text-sm font-semibold text-gray-800 dark:text-white">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button
                onClick={handleNextMonth}
                className="rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-0.5 grid grid-cols-7 gap-0.5">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs text-gray-500 dark:text-gray-400"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-0.5">
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square h-6" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const isSelected =
                  selectedDate?.getDate() === day &&
                  selectedDate?.getMonth() === currentDate.getMonth() &&
                  selectedDate?.getFullYear() === currentDate.getFullYear();
                const isToday =
                  day === new Date().getDate() &&
                  currentDate.getMonth() === new Date().getMonth() &&
                  currentDate.getFullYear() === new Date().getFullYear();

                return (
                  <button
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`
                      flex aspect-square h-6 items-center justify-center rounded text-xs
                      shadow-sm transition-all duration-200
                      ${
                        isSelected
                          ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                          : isToday
                            ? "bg-green-300 text-gray-900 dark:bg-green-500 dark:text-white"
                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      }
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Options Chain Display */}
        <motion.div
          className="w-full lg:w-3/4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {optionChain && (
            <OptionsChainComponent
              data={optionChain.snapshots}
              current_Price={current_Price}
              selectedDate={selectedDate}
              setStrikePrice={setStrikePrice}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OptionsTradingPage;

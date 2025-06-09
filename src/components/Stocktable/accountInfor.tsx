"use client";

import { motion } from "framer-motion";

const AccountInfor = ({ accountInfo }: { accountInfo: any }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-dark"
    >
      {/* Header Section */}
      <div className="mb-6 space-y-2">
        <h2 className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-2xl font-bold text-transparent">
          Account Information
        </h2>
        <div className="flex items-center gap-2">
          <motion.span
            className="h-1 w-16 rounded-full bg-primary/60"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
          />
          <motion.span
            className="h-1 w-8 rounded-full bg-primary/40"
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ delay: 0.2 }}
          />
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Buying Power Card */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl bg-gradient-to-r from-primary/5 to-blue-500/5 p-4"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Buying Power
          </p>
          <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
            ${new Intl.NumberFormat("en-US").format(accountInfo.buying_power)}
          </p>
        </motion.div>

        {/* Equity Card */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl bg-gradient-to-r from-green-500/5 to-emerald-500/5 p-4"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">Equity</p>
          <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
            ${new Intl.NumberFormat("en-US").format(accountInfo.equity)}
          </p>
        </motion.div>

        {/* Cash Card */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 p-4"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">Cash</p>
          <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
            ${new Intl.NumberFormat("en-US").format(accountInfo.cash)}
          </p>
        </motion.div>
      </div>

      {/* Detailed Information Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Account Status Card */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl border border-gray-100 p-4 dark:border-gray-800"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Account Status
            </span>
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                accountInfo.status === "ACTIVE"
                  ? "bg-green-100 text-green-600 dark:bg-green-900/30"
                  : "bg-red-100 text-red-600 dark:bg-red-900/30"
              }`}
            >
              {accountInfo.status}
            </span>
          </div>
        </motion.div>

        {/* Options Level Card */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl border border-gray-100 p-4 dark:border-gray-800"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Options Level
            </span>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-600 dark:bg-blue-900/30">
              Level {accountInfo.options_approved_level}
            </span>
          </div>
        </motion.div>

        {/* Options Buying Power Card */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl border border-gray-100 p-4 dark:border-gray-800 md:col-span-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Options Buying Power
            </span>
            <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              $
              {new Intl.NumberFormat("en-US").format(
                accountInfo.options_buying_power,
              )}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Additional Account Metrics */}
      <motion.div
        variants={itemVariants}
        className="mt-6 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 p-4 dark:from-gray-800 dark:to-gray-900"
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Day Trades
            </p>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {accountInfo.day_trades || 0}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pattern Day Trader
            </p>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {accountInfo.pattern_day_trader ? "Yes" : "No"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Trading Blocked
            </p>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {accountInfo.trading_blocked ? "Yes" : "No"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Account Type
            </p>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {accountInfo.account_type || "Standard"}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AccountInfor;

import { motion } from "framer-motion";

const Position = ({ positions }: { positions: any }) => {
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={tableVariants}
      className="w-full rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-dark"
    >
      {/* Header Section */}
      <div className="mb-6 flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-2xl font-bold text-transparent">
            Portfolio Assets
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

        {/* Summary Stats */}
        <div className="flex gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Assets
            </p>
            <p className="text-xl font-bold text-primary">{positions.length}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Active Positions
            </p>
            <p className="text-xl font-bold text-green-500">
              {positions.filter((p: any) => p.qty > 0).length}
            </p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-800">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Asset Class
              </th>
              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Symbol
              </th>
              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Quantity
              </th>
              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Average Price
              </th>
              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Current Price
              </th>
              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Profit/Loss
              </th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position: any, index: number) => (
              <motion.tr
                key={position.symbol}
                variants={rowVariants}
                className="border-b border-gray-100 transition-colors hover:bg-gray-50/50 dark:border-gray-800 dark:hover:bg-gray-800/50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        position.asset_class === "crypto"
                          ? "bg-purple-500"
                          : position.asset_class === "stock"
                            ? "bg-blue-500"
                            : "bg-green-500"
                      }`}
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {position.asset_class}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {position.symbol}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {position.qty}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    $
                    {new Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(position.avg_entry_price)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                      position.current_price >= position.avg_entry_price
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30"
                        : "bg-red-100 text-red-600 dark:bg-red-900/30"
                    }`}
                  >
                    $
                    {new Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(position.current_price)}
                  </motion.span>
                </td>
                <td className="px-6 py-4">
                  {(() => {
                    const profitLoss =
                      (position.current_price - position.avg_entry_price) *
                      position.qty;
                    const profitLossPercent =
                      ((position.current_price - position.avg_entry_price) /
                        position.avg_entry_price) *
                      100;

                    return (
                      <div className="flex flex-col">
                        <span
                          className={`text-sm font-medium ${
                            profitLoss >= 0 ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {profitLoss >= 0 ? "+" : ""}
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(profitLoss)}
                        </span>
                        <span
                          className={`text-xs ${
                            profitLoss >= 0 ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {profitLoss >= 0 ? "↑" : "↓"}{" "}
                          {Math.abs(profitLossPercent).toFixed(2)}%
                        </span>
                      </div>
                    );
                  })()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Position;

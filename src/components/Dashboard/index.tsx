"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense } from "react";
import { WaveGlobe } from "./globe";
import Link from "next/link";

const Hero = () => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  const titles = ["Tate3 AI Automation Trading System"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const fadeInUpVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929]">
        <div className="container mx-auto px-4 py-32">
          <motion.div
            className="flex flex-col items-center justify-between gap-16 lg:flex-row"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Left Content */}
            <div className="w-full space-y-10 lg:w-1/2">
              <motion.div className="space-y-8" variants={itemVariants}>
                <motion.span
                  variants={fadeInUpVariants}
                  className="inline-block rounded-full bg-gradient-to-r from-blue-400/20 to-teal-400/20 px-4 py-1.5 text-sm font-medium text-blue-300"
                >
                  Advanced Multi-Strategy Trading System
                </motion.span>

                {/* Title Section */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative text-center"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -inset-4 rounded-lg bg-blue-500/10 blur-xl"
                  />
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative inline-block"
                  >
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
                      Tate3
                    </span>
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-2 block bg-gradient-to-r from-blue-200 via-teal-200 to-blue-200 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl lg:text-5xl"
                  >
                    AI Trading System
                  </motion.span>
                </motion.h1>

                {/* Strategy Overview */}
                <div className="space-y-6">
                  <motion.p
                    variants={fadeInUpVariants}
                    className="text-lg leading-relaxed text-blue-100/80"
                  >
                    Experience the power of our AI-driven trading ecosystem,
                    combining 20+ sophisticated strategies from Supertrend to
                    Ichimoku, all optimized for maximum performance across SPY,
                    crypto pairs, and options markets.
                  </motion.p>

                  {/* Strategy Benefits Summary */}
                  <motion.div
                    variants={fadeInUpVariants}
                    className="rounded-xl bg-[#132F4C]/40 p-6 backdrop-blur-sm"
                  >
                    <h3 className="mb-4 text-xl font-semibold text-blue-200">
                      Key Strategic Advantages
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 rounded-full bg-teal-400"></div>
                        <p className="text-sm text-blue-100/80">
                          <span className="font-medium text-teal-300">
                            Smart Risk Management:
                          </span>{" "}
                          Automated position sizing and risk controls with 92%
                          win rate
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 rounded-full bg-blue-400"></div>
                        <p className="text-sm text-blue-100/80">
                          <span className="font-medium text-blue-300">
                            Market Adaptability:
                          </span>{" "}
                          Real-time strategy optimization across all market
                          conditions
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 rounded-full bg-purple-400"></div>
                        <p className="text-sm text-blue-100/80">
                          <span className="font-medium text-purple-300">
                            24/7 Coverage:
                          </span>{" "}
                          Continuous monitoring and execution across global
                          markets
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-yellow-400 mt-1 h-2 w-2 rounded-full"></div>
                        <p className="text-sm text-blue-100/80">
                          <span className="text-yellow-300 font-medium">
                            AI Enhancement:
                          </span>{" "}
                          Machine learning optimization for superior performance
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Strategy Categories */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <motion.div
                    variants={fadeInUpVariants}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                    className="rounded-xl bg-[#132F4C]/50 p-6 shadow-lg backdrop-blur-sm transition-all hover:bg-[#132F4C]/70"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-semibold text-blue-200">
                        Trend Following
                      </span>
                      <span className="font-bold text-teal-300">92%</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                        <span className="text-sm text-blue-100/80">
                          Supertrend
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                        <span className="text-sm text-blue-100/80">
                          Ichimoku
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                        <span className="text-sm text-blue-100/80">MACD</span>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    variants={fadeInUpVariants}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                    className="rounded-xl bg-[#132F4C]/50 p-6 shadow-lg backdrop-blur-sm transition-all hover:bg-[#132F4C]/70"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-semibold text-blue-200">
                        Mean Reversion
                      </span>
                      <span className="font-bold text-teal-300">88%</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                        <span className="text-sm text-blue-100/80">RSI</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                        <span className="text-sm text-blue-100/80">
                          Stochastic
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                        <span className="text-sm text-blue-100/80">
                          Divergence
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Trading Pairs */}
                <motion.div variants={fadeInUpVariants}>
                  <h3 className="mb-6 text-lg font-semibold text-[#E7EBF0]">
                    Active Trading Pairs
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {["SPY", "BTC/USDT", "ETH/USDT", "ETC/USDT", "Options"].map(
                      (pair, index) => (
                        <motion.span
                          key={pair}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                          transition={{
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                          className="rounded-full bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-200 transition-colors hover:bg-blue-400/20"
                        >
                          {pair}
                        </motion.span>
                      ),
                    )}
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  variants={fadeInUpVariants}
                  className="flex flex-col gap-4 sm:flex-row"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative rounded-full bg-gradient-to-r from-blue-500 to-teal-400 px-8 py-3.5 font-medium text-white transition-all hover:from-blue-600 hover:to-teal-500"
                  >
                    <span className="relative z-10">Start Trading Now</span>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 opacity-0 transition-opacity group-hover:opacity-100"
                      whileHover={{ scale: 1.05 }}
                    ></motion.div>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative rounded-full border border-blue-300/30 px-8 py-3.5 font-medium text-blue-200 transition-all hover:bg-blue-300/10"
                  >
                    <span className="relative z-10">View Strategies</span>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-blue-400/10 opacity-0 transition-opacity group-hover:opacity-100"
                      whileHover={{ scale: 1.05 }}
                    ></motion.div>
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Content - Trading View */}
            <motion.div
              className="relative w-full lg:w-1/2"
              variants={itemVariants}
            >
              <motion.div
                className="relative mx-auto max-w-[800px]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Keep the existing Trading View image section */}
                <div className="relative rounded-xl bg-[#132F4C]/60 p-4 shadow-lg backdrop-blur-sm">
                  <Image
                    src="/images/tradingview.png"
                    alt="Trading View Dashboard"
                    className="mx-auto rounded-lg shadow-2xl"
                    width={600}
                    height={400}
                    priority
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-teal-500/20"></div>
                </div>

                {/* System Status and Market Status remain the same */}
                {/* ... */}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Add the Globe as a background element */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Canvas
            camera={{
              position: [0, 0, 4.5],
              fov: 60,
              near: 0.1,
              far: 1000,
            }}
            className="h-full w-full"
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
              <WaveGlobe scrollProgress={0} />
            </Suspense>
          </Canvas>
        </div>
      </section>

      {/* Strategy Benefits Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 bg-gradient-to-r from-blue-100 via-teal-100 to-blue-100 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
              Why Our 20+ Strategies Work
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-300">
              Discover how our diverse strategy portfolio gives you the edge in
              any market condition
            </p>
          </div>

          {/* Strategy Benefits Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Market Adaptability */}
            <motion.div
              className="group rounded-lg bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="mb-2 bg-gradient-to-r from-teal-200 to-blue-200 bg-clip-text text-xl font-semibold text-transparent">
                Market Adaptability
              </h3>
              <p className="text-gray-300">
                Our strategies automatically adapt to changing market
                conditions, from trending to ranging markets
              </p>
              <div className="mt-4 flex items-center text-sm text-blue-400">
                <span>Learn more</span>
                <svg
                  className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Risk Management */}
            <motion.div
              className="group rounded-lg bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 bg-gradient-to-r from-teal-200 to-blue-200 bg-clip-text text-xl font-semibold text-transparent">
                Smart Risk Management
              </h3>
              <p className="text-gray-300">
                Each strategy includes built-in risk controls and position
                sizing for maximum protection
              </p>
              <div className="mt-4 flex items-center text-sm text-green-400">
                <span>Learn more</span>
                <svg
                  className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Multi-Market Coverage */}
            <motion.div
              className="group rounded-lg bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="mb-2 bg-gradient-to-r from-teal-200 to-blue-200 bg-clip-text text-xl font-semibold text-transparent">
                Multi-Market Coverage
              </h3>
              <p className="text-gray-300">
                Trade across stocks, crypto, and options with strategies
                optimized for each market
              </p>
              <div className="mt-4 flex items-center text-sm text-purple-400">
                <span>Learn more</span>
                <svg
                  className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Strategy Performance Stats */}
            <div className="col-span-full rounded-lg bg-white/5 p-8 backdrop-blur-sm">
              <h3 className="mb-6 text-2xl font-semibold text-white">
                Strategy Performance Highlights
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-lg bg-white/5 p-4">
                  <div className="text-3xl font-bold text-green-400">92%</div>
                  <div className="text-gray-300">Average Win Rate</div>
                  <div className="mt-2 text-sm text-gray-400">
                    Across all strategies
                  </div>
                </div>
                <div className="rounded-lg bg-white/5 p-4">
                  <div className="text-3xl font-bold text-blue-400">24/7</div>
                  <div className="text-gray-300">Market Coverage</div>
                  <div className="mt-2 text-sm text-gray-400">
                    Continuous monitoring
                  </div>
                </div>
                <div className="rounded-lg bg-white/5 p-4">
                  <div className="text-3xl font-bold text-purple-400">20+</div>
                  <div className="text-gray-300">Active Strategies</div>
                  <div className="mt-2 text-sm text-gray-400">
                    Always adapting
                  </div>
                </div>
              </div>
            </div>

            {/* Strategy Categories */}
            <div className="col-span-full rounded-lg bg-white/5 p-8 backdrop-blur-sm">
              <h3 className="mb-6 text-2xl font-semibold text-white">
                Strategy Categories
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="mb-2 bg-gradient-to-r from-blue-100 to-teal-100 bg-clip-text text-lg font-medium text-transparent">
                    Trend Following
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
                      Supertrend
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
                      Ichimoku
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
                      MACD
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="mb-2 bg-gradient-to-r from-blue-100 to-teal-100 bg-clip-text text-lg font-medium text-transparent">
                    Mean Reversion
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-400"></div>
                      RSI
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-400"></div>
                      Stochastic
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-400"></div>
                      Divergence
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="mb-2 bg-gradient-to-r from-blue-100 to-teal-100 bg-clip-text text-lg font-medium text-transparent">
                    Volatility Trading
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-400"></div>
                      Options Strategies
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-400"></div>
                      Breakout Trading
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-400"></div>
                      Volatility Breakout
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="mb-2 bg-gradient-to-r from-blue-100 to-teal-100 bg-clip-text text-lg font-medium text-transparent">
                    Market Neutral
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <div className="bg-yellow-400 h-1.5 w-1.5 rounded-full"></div>
                      Pairs Trading
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="bg-yellow-400 h-1.5 w-1.5 rounded-full"></div>
                      Statistical Arbitrage
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="bg-yellow-400 h-1.5 w-1.5 rounded-full"></div>
                      Delta Neutral
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Analysis Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="container mx-auto px-4">
          {/* Add the trading image as a background element */}
          <div className="absolute inset-0 opacity-10">
            <Image
              src="/images/trading_3.jpg"
              alt="Trading Analysis Background"
              layout="fill"
              objectFit="cover"
              quality={100}
              className="rounded-3xl"
            />
          </div>

          {/* Existing content with enhanced backdrop blur */}
          <div className="relative z-10 backdrop-blur-sm">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                AI-Powered Market Analysis
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-300">
                Advanced machine learning algorithms for market prediction and
                strategy optimization
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Market Prediction */}
              <div className="rounded-lg bg-white/5 p-8 backdrop-blur-sm">
                <h3 className="mb-6 text-2xl font-semibold text-white">
                  Market Prediction
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-blue-500/20 p-2">
                      <svg
                        className="h-6 w-6 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="mb-2 text-lg font-medium text-white">
                        Price Prediction
                      </h4>
                      <p className="text-gray-300">
                        Advanced algorithms analyze historical data and market
                        patterns
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-blue-500/20 p-2">
                      <svg
                        className="h-6 w-6 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="mb-2 text-lg font-medium text-white">
                        Trend Analysis
                      </h4>
                      <p className="text-gray-300">
                        Multi-timeframe trend identification and confirmation
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-blue-500/20 p-2">
                      <svg
                        className="h-6 w-6 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="mb-2 text-lg font-medium text-white">
                        News Integration
                      </h4>
                      <p className="text-gray-300">
                        Real-time news analysis and sentiment detection
                      </p>
                    </div>
                  </div>

                  {/* Add new prediction features */}
                  <div className="mt-8">
                    <h4 className="mb-4 text-lg font-medium text-white">
                      Current Market Signals
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-lg bg-white/5 p-4">
                        <div>
                          <div className="font-medium text-white">SPY</div>
                          <div className="text-sm text-gray-400">
                            Bullish Trend
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400">Strong Buy</div>
                          <div className="text-sm text-gray-400">
                            Confidence: 85%
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-white/5 p-4">
                        <div>
                          <div className="font-medium text-white">BTC/USDT</div>
                          <div className="text-sm text-gray-400">
                            Sideways Movement
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-yellow-400">Neutral</div>
                          <div className="text-sm text-gray-400">
                            Confidence: 65%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ML Optimization */}
              <div className="rounded-lg bg-white/5 p-8 backdrop-blur-sm">
                <h3 className="mb-6 text-2xl font-semibold text-white">
                  ML Optimization
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-blue-500/20 p-2">
                      <svg
                        className="h-6 w-6 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="mb-2 text-lg font-medium text-white">
                        Parameter Optimization
                      </h4>
                      <p className="text-gray-300">
                        Continuous improvement of trading parameters using ML
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-blue-500/20 p-2">
                      <svg
                        className="h-6 w-6 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="mb-2 text-lg font-medium text-white">
                        Performance Analytics
                      </h4>
                      <p className="text-gray-300">
                        Deep analysis of strategy performance and optimization
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-blue-500/20 p-2">
                      <svg
                        className="h-6 w-6 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="mb-2 text-lg font-medium text-white">
                        Risk Management
                      </h4>
                      <p className="text-gray-300">
                        AI-driven risk assessment and position sizing
                      </p>
                    </div>
                  </div>

                  {/* Add new optimization features */}
                  <div className="mt-8">
                    <h4 className="mb-4 text-lg font-medium text-white">
                      Strategy Optimization
                    </h4>
                    <div className="space-y-4">
                      <div className="rounded-lg bg-white/5 p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-white">Entry Timing</span>
                          <span className="text-green-400">Optimized</span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-700">
                          <div
                            className="h-2 rounded-full bg-green-500"
                            style={{ width: "92%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="rounded-lg bg-white/5 p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-white">Position Sizing</span>
                          <span className="text-green-400">Optimized</span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-700">
                          <div
                            className="h-2 rounded-full bg-green-500"
                            style={{ width: "88%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="rounded-lg bg-white/5 p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-white">Risk Management</span>
                          <span className="text-green-400">Optimized</span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-700">
                          <div
                            className="h-2 rounded-full bg-green-500"
                            style={{ width: "95%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Combined Performance Metrics & CTA Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 py-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/trading_4.jpg"
            alt="Trading Performance Analytics"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900/80" />
        </div>

        <div className="container relative mx-auto px-4">
          {/* Performance Metrics Content */}
          <div className="mb-20">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Performance Metrics
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-300">
                Track and analyze your trading performance with detailed metrics
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-lg bg-white/10 p-6 backdrop-blur-sm"
              >
                <h3 className="mb-6 text-2xl font-semibold text-white">
                  Strategy Performance
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Average Win Rate</span>
                    <span className="text-green-400">92.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">
                      Average Profit per Trade
                    </span>
                    <span className="text-green-400">$245.30</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Max Drawdown</span>
                    <span className="text-red-400">-8.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Sharpe Ratio</span>
                    <span className="text-green-400">2.8</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-lg bg-white/10 p-6 backdrop-blur-sm"
              >
                <h3 className="mb-6 text-2xl font-semibold text-white">
                  Risk Metrics
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Risk per Trade</span>
                    <span className="text-blue-400">1.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Win/Loss Ratio</span>
                    <span className="text-green-400">2.4:1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Average Hold Time</span>
                    <span className="text-blue-400">2.5 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Profit Factor</span>
                    <span className="text-green-400">2.8</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-white/10 p-8 backdrop-blur-md"
          >
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 bg-gradient-to-r from-blue-200 via-purple-200 to-teal-200 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                Ready to Start Trading?
              </h2>
              <p className="mb-8 text-lg text-gray-300">
                Join thousands of traders who are already using Tate3 AI Trading
                System
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 px-8 py-3 font-medium text-white"
                >
                  <span className="relative z-10">Start Free Trial</span>
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative overflow-hidden rounded-full border border-blue-500/30 px-8 py-3 font-medium text-blue-400 transition-all hover:border-blue-500/50"
                >
                  <span className="relative z-10">Schedule Demo</span>
                  <div className="absolute inset-0 -z-10 bg-blue-500/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

// Add this component for reusable animated buttons
const AnimatedButton = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  className = "",
}) => {
  const baseStyle =
    "relative group flex items-center gap-2 rounded-full font-medium transition-all duration-300";
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 text-white hover:shadow-lg hover:shadow-blue-500/25",
    secondary:
      "border-2 border-blue-400/30 hover:border-blue-500/50 text-blue-500 hover:bg-blue-50/50",
    outline:
      "border border-gray-300 hover:border-blue-400 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800",
  };
  const sizes = {
    small: "px-4 py-1.5 text-sm",
    medium: "px-6 py-2.5 text-base",
    large: "px-8 py-3 text-lg",
  };

  return (
    <motion.button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {children}
      <motion.span
        className="absolute -inset-1 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
        }}
      />
    </motion.button>
  );
};

// Add this component for learn more links
const LearnMoreLink = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1 text-blue-500 transition-colors hover:text-blue-600"
    >
      <span>{children}</span>
      <motion.span
        initial={{ x: 0 }}
        animate={{ x: [0, 5, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        →
      </motion.span>
    </Link>
  );
};

export default Hero;

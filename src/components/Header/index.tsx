"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggler from "./ThemeToggler";
import menuData, { MenuItem } from "./menuData";
import { IconType } from "react-icons";
import React from "react";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);
  const pathname = usePathname();

  // Enhanced sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY >= 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  // Add animation variants for the title
  const titleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const glowVariants = {
    initial: {
      opacity: 0.5,
      scale: 1,
    },
    animate: {
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const renderIcon = (icon: IconType | undefined) => {
    if (!icon) return null;
    return <span className="text-lg">{icon({ className: "w-5 h-5" })}</span>;
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        sticky
          ? "bg-white/80 shadow-lg backdrop-blur-lg dark:bg-gray-900/80"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo and Title with Animation */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <motion.div
                variants={glowVariants}
                initial="initial"
                animate="animate"
                className="absolute -inset-2 rounded-lg bg-blue-500/20 blur-lg"
              />
              <motion.div
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                className="relative flex items-center gap-1"
              >
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 bg-clip-text text-2xl font-bold text-transparent">
                  Tate3
                </span>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl font-semibold text-gray-700 dark:text-gray-200"
                >
                  AI Trading
                </motion.span>
              </motion.div>
            </div>
          </Link>

          {/* Hover effect for the entire logo area */}
          <style jsx>{`
            .logo-container:hover .glow {
              filter: brightness(1.2);
              transform: scale(1.05);
            }
          `}</style>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center space-x-8">
              {menuData.map((item: MenuItem, index) => (
                <motion.li
                  key={item.id}
                  variants={menuItemVariants}
                  className="group relative"
                >
                  {item.path ? (
                    <Link
                      href={item.path}
                      className={`relative flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
                        pathname === item.path
                          ? "text-blue-500 dark:text-blue-400"
                          : "text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                      }`}
                    >
                      {renderIcon(item.icon)}
                      {item.title}
                      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-500 transition-all group-hover:w-full" />
                    </Link>
                  ) : (
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenIndex(openIndex === index ? -1 : index)
                        }
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                      >
                        {renderIcon(item.icon)}
                        {item.title}
                        <motion.svg
                          animate={{ rotate: openIndex === index ? 180 : 0 }}
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </motion.svg>
                      </button>

                      {/* Submenu */}
                      <AnimatePresence>
                        {openIndex === index && item.submenu && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute left-0 mt-2 w-48 rounded-lg bg-white p-2 shadow-xl dark:bg-gray-800"
                          >
                            {item.submenu.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                href={subItem.path}
                                className="block rounded-md px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-500 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                              >
                                {subItem.title}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <ThemeToggler />

            {/* Auth Buttons */}
            <div className="hidden md:flex md:items-center md:gap-3">
              <Link
                href="/signin"
                className="rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-600 hover:shadow-lg"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 lg:hidden"
            >
              <motion.div
                animate={navbarOpen ? "open" : "closed"}
                className="relative h-6 w-6"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 8 },
                  }}
                  className="absolute h-0.5 w-full bg-current"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  className="absolute top-2.5 h-0.5 w-full bg-current"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -8 },
                  }}
                  className="absolute bottom-0 h-0.5 w-full bg-current"
                />
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {navbarOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden"
            >
              <div className="space-y-2 px-4 pb-4">
                {menuData.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={menuItemVariants}
                    className="rounded-lg"
                  >
                    {item.path ? (
                      <Link
                        href={item.path}
                        className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium ${
                          pathname === item.path
                            ? "bg-blue-50 text-blue-500 dark:bg-gray-800 dark:text-blue-400"
                            : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                        }`}
                      >
                        {item.icon &&
                          React.createElement(item.icon as IconType, {
                            className: "w-5 h-5",
                          })}
                        {item.title}
                      </Link>
                    ) : (
                      <button
                        onClick={() =>
                          setOpenIndex(openIndex === index ? -1 : index)
                        }
                        className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        {item.title}
                        <motion.svg
                          animate={{ rotate: openIndex === index ? 180 : 0 }}
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </motion.svg>
                      </button>
                    )}

                    <AnimatePresence>
                      {openIndex === index && item.submenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-2 space-y-1 pl-4"
                        >
                          {item.submenu.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.path}
                              className="block rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}

                {/* Mobile Auth Buttons */}
                <div className="mt-4 space-y-2 md:hidden">
                  <Link
                    href="/signin"
                    className="block rounded-lg px-4 py-2 text-center text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="block rounded-lg bg-blue-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-600"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;

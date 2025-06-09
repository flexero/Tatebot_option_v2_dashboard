"use client";

import { SearchIcon } from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import { useSidebarContext } from "../sidebar/sidebar-context";
import { MenuIcon } from "./icons";
import { Notification } from "./notification";
import { ThemeToggleSwitch } from "./theme-toggle";
import { UserInfo } from "./user-info";
import { NAV_DATA } from "../sidebar/data";
import { NAV_DATA_2 } from "../sidebar/traderData";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";

export function HeaderDashboard() {
  const { toggleSidebar, isMobile } = useSidebarContext();
  const [isOpen, setIsOpen] = useState(false);
  const [headerTitle, setHeaderTitle] = useState<any>();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const role = Cookies.get("role");
    if (role === "trader") {
      // setHeaderTitle(NAV_DATA_2);
    } else {
      setHeaderTitle(NAV_DATA);
    }
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-30 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 shadow-lg backdrop-blur-lg dark:bg-gray-dark/80"
          : "bg-white dark:bg-gray-dark"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4 md:px-6 2xl:px-8">
        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative z-50 rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
        >
          <div className="flex h-5 w-6 flex-col justify-between">
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-full origin-left transform bg-dark transition-transform dark:bg-white"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="h-0.5 w-full bg-dark dark:bg-white"
            />
            <motion.span
              animate={
                isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
              }
              className="h-0.5 w-full origin-left transform bg-dark transition-transform dark:bg-white"
            />
          </div>
        </motion.button>

        {/* Logo */}
        <motion.div
          className="flex items-center gap-4"
          whileHover={{ scale: 1.02 }}
        >
          <Link href="/" className="flex items-center gap-2">
            <h3 className="text-xl font-bold md:text-2xl lg:text-3xl">
              <motion.span
                className="bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600 bg-clip-text tracking-tight text-transparent"
                animate={{
                  backgroundPosition: ["0%", "100%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                Intuitive Capital
              </motion.span>
            </h3>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-1 md:flex lg:space-x-2">
          {headerTitle?.map((items: any) =>
            items.items.map((item: any) => (
              <motion.div
                key={item.title}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.url}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-all lg:text-base
                    ${
                      pathname === item.url
                        ? "bg-gradient-to-r from-emerald-500/10 to-blue-500/10 text-emerald-600 dark:text-emerald-400"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    }`}
                >
                  {item.title}
                </Link>
              </motion.div>
            )),
          )}
        </nav>

        {/* Right Side Items */}
        <div className="flex items-center gap-2 lg:gap-4">
          <motion.div
            className="flex items-center gap-3"
            initial={false}
            animate={{ x: 0, opacity: 1 }}
          >
            <ThemeToggleSwitch />
            <Notification />
            <UserInfo />
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[72px] bg-white shadow-xl dark:bg-gray-900 md:hidden"
          >
            <nav className="flex flex-col p-4">
              {headerTitle?.map((items: any) =>
                items.items.map((item: any) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={item.url}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block rounded-lg px-4 py-3 text-base font-medium transition-all
                        ${
                          pathname === item.url
                            ? "bg-gradient-to-r from-emerald-500/10 to-blue-500/10 text-emerald-600 dark:text-emerald-400"
                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        }`}
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                )),
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

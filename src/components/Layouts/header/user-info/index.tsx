"use client";

import { ChevronUpIcon } from "@/assets/icons";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LogOutIcon, SettingsIcon, UserIcon } from "./icons";
import { useAuth } from "@/providers/AuthProvider";

export function UserInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const { signout } = useAuth();
  const USER = {
    name: "Vladyslav",
    email: "Vladyslav999@gmail.com",
    img: "/images/user/user.png",
  };

  return (
    <div className="relative inline-block">
      <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
        <DropdownTrigger className="flex items-end gap-3 rounded-xl p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
          <span className="sr-only">My Account</span>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Image
                src={USER.img}
                className="h-10 w-10 rounded-full border-2 border-gray-100 object-cover dark:border-gray-700"
                alt={`Avatar of ${USER.name}`}
                width={200}
                height={200}
              />
              <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500 dark:border-gray-800" />
            </div>
            <div className="flex items-center gap-2 max-[1024px]:sr-only">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {USER.name}
              </span>
              <ChevronUpIcon
                className={cn("h-4 w-4 text-gray-500", isOpen && "rotate-180")}
                strokeWidth={2}
              />
            </div>
          </div>
        </DropdownTrigger>

        <DropdownContent className="absolute !right-0 mt-2 w-72 rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <div className="p-4">
            <div className="mb-3 flex items-center gap-3">
              <Image
                src={USER.img}
                className="h-12 w-12 rounded-full border-2 border-gray-100 object-cover dark:border-gray-700"
                alt={`Avatar of ${USER.name}`}
                width={200}
                height={200}
              />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {USER.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {USER.email}
                </div>
              </div>
            </div>
          </div>

          <div className="px-1">
            <div className="my-2 h-px bg-gray-200 dark:bg-gray-700" />

            <Link
              href="/profile"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <UserIcon className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium">View Profile</span>
            </Link>

            <Link
              href="/pages/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <SettingsIcon className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium">Account Settings</span>
            </Link>

            <button
              onClick={() => setShowPasswordModal(true)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <SettingsIcon className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium">Change Password</span>
            </button>

            <div className="my-2 h-px bg-gray-200 dark:bg-gray-700" />

            <button
              onClick={signout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <LogOutIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Log out</span>
            </button>
          </div>
        </DropdownContent>
      </Dropdown>

      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative mx-auto w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800">
            <button
              onClick={() => setShowPasswordModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Change Password
              </h2>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowPasswordModal(false);
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 
                             text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none
                             focus:ring-2 focus:ring-blue-500/20
                             dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 
                             text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none
                             focus:ring-2 focus:ring-blue-500/20
                             dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 
                             text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none
                             focus:ring-2 focus:ring-blue-500/20
                             dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400"
                  />
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="rounded-lg bg-gray-100 px-4 py-2.5 text-sm 
                             font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700
                             dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-500 px-4 py-2.5 
                             text-sm font-medium
                             text-white hover:bg-blue-600"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo or Dashboard Title */}
          <h1 className="text-xl font-bold">Dashboard</h1>

          {/* Centered Button */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <button className="inline-flex items-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent">
              Center Button
            </button>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/3">
            <button className="inline-flex items-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent">
              Center Button
            </button>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/4">
            <button className="inline-flex items-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent">
              Center Button
            </button>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Logout
            </button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;

"use client";

import React, { useState, Suspense } from "react";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";

import styles from "./clientLayout.module.css";
import { ThemeProvider } from "@/context/ThemeContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar will be passed to Navbar
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Function to close sidebar will be passed to Sidebar
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <ThemeProvider>
      <div className={styles.layoutWrapper}>
        <Navbar onMenuClick={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <main className={styles.mainContent}>
          <Suspense fallback={<div>Loading content...</div>}>
            {children}
          </Suspense>
        </main>
      </div>
    </ThemeProvider>
  );
}

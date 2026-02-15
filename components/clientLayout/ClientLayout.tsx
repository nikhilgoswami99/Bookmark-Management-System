"use client";

import React, { useState } from 'react';
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";

import styles from './clientLayout.module.css';
import { ThemeProvider } from '@/context/ThemeContext';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar will be passed to Navbar
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  // Function to close sidebar will be passed to Sidebar
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <ThemeProvider>
      <Navbar onMenuClick={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <main className={styles.mainContent}>
        {children}
      </main>
    </ThemeProvider>
  );
}

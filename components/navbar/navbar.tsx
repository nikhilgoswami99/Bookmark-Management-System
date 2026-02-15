"use client";

import React from "react";
import styles from "./navbar.module.css";
import { FiSearch, FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { MdBookmarkBorder } from "react-icons/md";
import { useTheme } from "@/context/ThemeContext";

interface NavbarProps {
  onMenuClick?: () => void;
}

function Navbar({ onMenuClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo Section */}
        <div className={styles.logo}>
          <button className={styles.menuButton} onClick={onMenuClick}>
            <FiMenu />
          </button>
          <span className={styles.logoIcon}>
            <MdBookmarkBorder />
          </span>
          
          <span className={styles.logoText}>Bookmark Manager</span>
        </div>

        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by title..."
            className={styles.searchInput}
          />
        </div>

        {/* Right Section */}
        <div className={styles.rightSection}>
          <div className={styles.actionButtons}>
            <button 
              className={styles.iconButton} 
              onClick={toggleTheme}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === "light" ? <FiMoon /> : <FiSun />}
            </button>
          </div>
          <div className={styles.userAvatar}>
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className={styles.avatarImage}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

"use client";

import React from "react";
import styles from "./navbar.module.css";
import { FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { MdBookmarkBorder } from "react-icons/md";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import SearchBar from "../searchBar/searchBar";
import ProfileDropdown from "../profileDropdown/profileDropdown";

interface NavbarProps {
  onMenuClick?: () => void;
}

function Navbar({ onMenuClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

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

        {/* Search Bar Component */}
        <SearchBar className={styles.navbarSearch} />

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

          {user && <ProfileDropdown user={user} logout={logout} />}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

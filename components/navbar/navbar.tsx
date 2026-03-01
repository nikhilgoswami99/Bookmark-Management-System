"use client";

import React from "react";
import styles from "./navbar.module.css";
import { FiSearch, FiMenu, FiMoon, FiSun, FiLogOut } from "react-icons/fi";
import { MdBookmarkBorder } from "react-icons/md";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

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

            {user && (
              <button 
                className={`${styles.iconButton} ${styles.logoutButton}`} 
                onClick={logout}
                title="Logout"
              >
                <FiLogOut />
              </button>
            )}
          </div>

          <div className={styles.userAvatar}>
            <img
              src={user?.profilePic || "https://st5.depositphotos.com/1915171/64699/v/950/depositphotos_646996714-stock-illustration-user-profile-icon-vector-avatar.jpg"}
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

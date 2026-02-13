"use client";

import React from "react";
import styles from "./navbar.module.css";
import { FiSearch, FiMenu } from "react-icons/fi";
import { BsBookmark } from "react-icons/bs";

interface NavbarProps {
  onMenuClick?: () => void;
}

function Navbar({ onMenuClick }: NavbarProps) {

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo Section */}
        <div className={styles.logo}>
          <button className={styles.menuButton} onClick={onMenuClick}>
            <FiMenu />
          </button>
          <BsBookmark className={styles.logoIcon} />
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

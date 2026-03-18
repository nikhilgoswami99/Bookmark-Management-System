"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import styles from "./profileDropdown.module.css";
import { FiLogOut, FiUser, FiSettings, FiChevronDown } from "react-icons/fi";

interface ProfileDropdownProps {
  user: { name: string; email: string; profilePic?: string };
  logout: () => void;
}

const ProfileDropdown = ({ user, logout }: ProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const closeDropdown = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);

  }, [isOpen]);




  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      {/* Profile Trigger Button */}
      <button className={styles.profileTrigger} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.avatarWrapper}>
          <img
            src={user?.profilePic || "https://st5.depositphotos.com/1915171/64699/v/950/depositphotos_646996714-stock-illustration-user-profile-icon-vector-avatar.jpg"}
            alt="User Profile"
            className={styles.avatarImage}
          />
        </div>
        <FiChevronDown className={`${styles.chevron} ${isOpen ? styles.chevronRotated : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && <div className={styles.dropdownMenu}>
        <div className={styles.userInfo}>
          <p className={styles.userName}>{user?.name}</p>
          <p className={styles.userEmail}>{user?.email}</p>
        </div>

        <div className={styles.divider} />

        <ul className={styles.menuList}>
          <Link href="/profile" onClick={() => setIsOpen(false)}>
            <li className={styles.menuItem}>
              <FiUser className={styles.itemIcon} />
              <span>Profile</span>
            </li>
          </Link>
          <li className={styles.menuItem}>
            <FiSettings className={styles.itemIcon} />
            <span>Settings</span>
          </li>
          <div className={styles.divider} />
          <li className={`${styles.menuItem} ${styles.logoutItem}`} onClick={logout}>
            <FiLogOut className={styles.itemIcon} />
            <span>Logout</span>
          </li>
        </ul>
      </div>}
    </div>
  );
};

export default ProfileDropdown;

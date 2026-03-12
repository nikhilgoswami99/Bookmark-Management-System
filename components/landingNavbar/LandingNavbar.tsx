"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HiMenu, HiX } from 'react-icons/hi';
import styles from './LandingNavbar.module.css';

const LandingNavbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink}>
        <div className={styles.logo}>Sangrah</div>
      </Link>

      {/* Hamburger Button */}
      <button className={styles.menuButton} onClick={toggleMenu} aria-label="Toggle menu">
        {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Desktop Nav */}
      <div className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
        <button 
          onClick={() => handleNavigation('/signin')} 
          className={styles.navLink}
        >
          Sign In
        </button>
        <button 
          onClick={() => handleNavigation('/signup')} 
          className={styles.navButton}
        >
          Register
        </button>
      </div>
    </header>
  );
};

export default LandingNavbar;

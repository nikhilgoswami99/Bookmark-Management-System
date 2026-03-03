"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './LandingNavbar.module.css';

const LandingNavbar = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink}>
        <div className={styles.logo}>Sangrah</div>
      </Link>
      <div className={styles.nav}>
        <button 
          onClick={() => router.push('/signin')} 
          className={styles.navLink}
        >
          Sign In
        </button>
        <button 
          onClick={() => router.push('/signup')} 
          className={styles.navButton}
        >
          Register
        </button>
      </div>
    </header>
  );
};

export default LandingNavbar;

import React from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>
        Master Your <span className={styles.gradientText}>Digital Library</span>
      </h1>
      <p className={styles.subtitle}>
        One place for all your inspiration, knowledge, and research.
        Beautifully organized and instantly searchable.
      </p>
      <div className={styles.ctaGroup}>
        <Link href="/signup" className={styles.primaryButton}>Get Started Free</Link>
      </div>
    </section>
  );
};

export default Hero;

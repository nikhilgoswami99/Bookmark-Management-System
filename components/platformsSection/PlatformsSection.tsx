"use client";

import React from 'react';
import { HiGlobeAlt } from 'react-icons/hi';
import styles from './PlatformsSection.module.css';

const platforms = [
  { name: 'Twitter / X', initials: 'X', class: styles.twitter },
  { name: 'YouTube', initials: 'YT', class: styles.youtube },
  { name: 'Reddit', initials: 'R', class: styles.reddit },
  { name: 'GitHub', initials: 'GH', class: styles.github },
  { name: 'Instagram', initials: 'IG', class: styles.instagram },
  { name: 'LinkedIn', initials: 'Li', class: styles.linkedin },
  { name: 'Stack Overflow', initials: 'SO', class: styles.stackoverflow },
  { name: 'Medium', initials: 'M', class: styles.medium },
  { name: 'Hacker News', initials: 'HN', class: styles.hackernews },
  { name: 'Pinterest', initials: 'Pi', class: styles.pinterest },
  { name: 'Dev.to', initials: 'D', class: styles.devto },
  { name: 'Any Website', initials: <HiGlobeAlt />, class: styles.any, isIcon: true },
];

const steps = [
  {
    number: 1,
    title: 'Save a link',
    description: 'Paste a URL or use our browser extension to save any page instantly.'
  },
  {
    number: 2,
    title: 'Auto-organize',
    description: 'We detect the source and suggest tags, collections, and categories.'
  },
  {
    number: 3,
    title: 'Find it later',
    description: 'Search, filter, and browse your curated library whenever you need it.'
  }
];

const PlatformsSection = () => {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className={styles.title}>Save from anywhere on the web</h2>
        <p className={styles.subtitle}>
          Sangrah works with all your favorite platforms and any URL on the internet.
        </p>
      </header>

      <div className={styles.platformsContainer}>
        {platforms.map((platform, index) => (
          <div key={index} className={styles.platformPill}>
            <div className={`${styles.iconBox} ${platform.class}`}>
              {platform.initials}
            </div>
            <span>{platform.name}</span>
          </div>
        ))}
      </div>

      <div className={styles.stepsContainer}>
        {steps.map((step) => (
          <div key={step.number} className={styles.stepCard}>
            <div className={styles.stepNumber}>
              {step.number}
            </div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDescription}>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlatformsSection;

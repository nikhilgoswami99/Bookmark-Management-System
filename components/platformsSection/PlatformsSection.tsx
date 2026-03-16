"use client";

import React from 'react';
import { HiGlobeAlt } from 'react-icons/hi';
import styles from './PlatformsSection.module.css';

const platforms = [
  { name: 'Twitter / X', domain: 'x.com', class: styles.twitter },
  { name: 'YouTube', domain: 'youtube.com', class: styles.youtube },
  { name: 'Reddit', domain: 'reddit.com', class: styles.reddit },
  { name: 'GitHub', domain: 'github.com', class: styles.github },
  { name: 'Instagram', domain: 'instagram.com', class: styles.instagram },
  { name: 'LinkedIn', domain: 'linkedin.com', class: styles.linkedin },
  { name: 'Stack Overflow', domain: 'stackoverflow.com', class: styles.stackoverflow },
  { name: 'Medium', domain: 'medium.com', class: styles.medium },
  { name: 'Hacker News', domain: 'news.ycombinator.com', class: styles.hackernews },
  { name: 'Pinterest', domain: 'pinterest.com', class: styles.pinterest },
  { name: 'Dev.to', domain: 'dev.to', class: styles.devto },
  { name: 'Notion', domain: 'notion.so', class: styles.notion },
  { name: 'Substack', domain: 'substack.com', class: styles.substack },
  { name: 'Any Website', domain: '', class: styles.any, isIcon: true },
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
              {platform.isIcon ? (
                <HiGlobeAlt size={20} />
              ) : (
                <img 
                  src={`https://www.google.com/s2/favicons?sz=64&domain=${platform.domain}`} 
                  alt={platform.name}
                  className={styles.favicon}
                />
              )}
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

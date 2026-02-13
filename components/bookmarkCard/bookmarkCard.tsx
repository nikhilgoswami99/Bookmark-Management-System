import React from 'react'
import styles from './bookmarkCard.module.css'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { AiOutlineCalendar } from 'react-icons/ai'

interface BookmarkCardProps {
  title: string;
  url: string;
  description: string;
  tags: string[];
  date: string;
  favicon?: string;
}

function BookmarkCard({ title, url, description, tags, date, favicon }: BookmarkCardProps) {
  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.logoSection}>
          {favicon ? (
            <img src={favicon} alt={title} className={styles.favicon} />
          ) : (
            <div className={styles.faviconPlaceholder}>
              {title.charAt(0).toUpperCase()}
            </div>
          )}
          <div className={styles.titleSection}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.url}>{url}</p>
          </div>
        </div>
        <button className={styles.menuButton}>
          <BsThreeDotsVertical />
        </button>
      </div>

      {/* Description */}
      <p className={styles.description}>{description}</p>

      {/* Tags */}
      <div className={styles.tags}>
        {tags.map((tag, index) => (
          <span key={index} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.stat}>
          <AiOutlineCalendar className={styles.icon} />
          <span>{date}</span>
        </div>
        <button className={styles.bookmarkButton}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 2h10v12l-5-3-5 3V2z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default BookmarkCard

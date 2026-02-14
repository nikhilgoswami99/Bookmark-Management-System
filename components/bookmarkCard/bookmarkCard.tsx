import React from 'react'
import styles from './bookmarkCard.module.css'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { AiOutlineCalendar } from 'react-icons/ai'
import { MdBookmarkBorder } from 'react-icons/md'
import DeleteButton from '../deleteButton/DeleteButton'

interface BookmarkCardProps {
  _id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  date: string;
  favicon?: string;
  onDelete: () => void;
}

function BookmarkCard({ _id, title, url, description, tags, date, favicon, onDelete }: BookmarkCardProps) {
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
        <div className={styles.actions}>
          <DeleteButton onClick={onDelete} />
          <button className={styles.bookmarkButton}>
            <MdBookmarkBorder />
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookmarkCard
